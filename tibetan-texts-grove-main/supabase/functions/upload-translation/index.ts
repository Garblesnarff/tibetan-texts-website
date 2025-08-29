import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function generateStorageSafeName(fileName: string, fileType: string): string {
  // Extract the code prefix (e.g., "SALO001" or "GRAM010")
  const codeMatch = fileName.match(/^([A-Z]+\d+)/);
  const code = codeMatch ? codeMatch[1] : 'DOC';
  
  // Create a timestamp-based unique identifier
  const timestamp = new Date().getTime();
  const fileExt = fileName.split('.').pop();
  
  // Create a safe filename using the code and timestamp
  return `${fileType}/${code}_${timestamp}.${fileExt}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    const fileType = formData.get('fileType') as string
    const title = formData.get('title') as string
    const tibetanTitle = formData.get('tibetanTitle') as string

    if (!file) {
      throw new Error('No file uploaded')
    }

    console.log('Received file upload request:', {
      originalFileName: file.name,
      fileType,
      title,
      tibetanTitle
    })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Generate a storage-safe filename while preserving the original name in metadata
    const storageSafeName = generateStorageSafeName(file.name, fileType)

    console.log('Uploading file to path:', storageSafeName)

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('admin_translations')
      .upload(storageSafeName, file, {
        contentType: file.type,
        upsert: true,
        duplex: 'half'
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      throw new Error(`Failed to upload file: ${uploadError.message}`)
    }

    console.log('File uploaded successfully:', uploadData)

    // Find existing translation with the same title
    const { data: existingTranslation } = await supabase
      .from('translations')
      .select('id, metadata')
      .eq('title', title)
      .maybeSingle()

    // Update or insert translation record
    const translationData = {
      title: title.trim(),
      tibetan_title: tibetanTitle.trim(),
      [fileType === 'source' ? 'source_file_path' : 'translation_file_path']: storageSafeName,
      metadata: {
        ...((existingTranslation?.metadata as any) || {}),
        originalFileName: file.name,
        originalTibetanFileName: file.name // Store the original Tibetan filename
      },
      updated_at: new Date().toISOString()
    }

    const { data: translation, error: dbError } = existingTranslation?.id 
      ? await supabase
          .from('translations')
          .update(translationData)
          .eq('id', existingTranslation.id)
          .select()
          .single()
      : await supabase
          .from('translations')
          .insert(translationData)
          .select()
          .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error(`Failed to update translation record: ${dbError.message}`)
    }

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully',
        translation,
        filePath: storageSafeName
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200
      }
    )

  } catch (error) {
    console.error('Upload error:', error)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred during upload'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 400
      }
    )
  }
})