
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const isRateLimited = (identifier: string, maxRequests = 2, windowMs = 60000): boolean => {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }
  
  if (entry.count >= maxRequests) {
    return true;
  }
  
  entry.count++;
  rateLimitStore.set(identifier, entry);
  return false;
};

const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { name, email, school, role, subject } = await req.json()
    
    // Input validation and sanitization
    if (!name || !email || !school || !role) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase(),
      school: sanitizeInput(school),
      role: sanitizeInput(role),
      subject: subject ? sanitizeInput(subject) : null
    };

    // Validate email format
    if (!validateEmail(sanitizedData.email)) {
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Rate limiting by email
    if (isRateLimited(sanitizedData.email)) {
      return new Response(
        JSON.stringify({ error: 'Too many email requests. Please try again later.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 429 }
      )
    }

    // Verify registration exists in database
    const { data: registration, error: dbError } = await supabaseClient
      .from('registrations')
      .select('id, name, email, school, role, subject')
      .eq('email', sanitizedData.email)
      .single()

    if (dbError || !registration) {
      console.error('Registration verification failed:', dbError)
      return new Response(
        JSON.stringify({ error: 'Registration not found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 404 }
      )
    }

    // Prepare email content with role-specific information
    let roleSpecificContent = '';
    if (registration.role === 'teacher' && registration.subject) {
      roleSpecificContent = `<p><strong>Subject:</strong> ${registration.subject}</p>`;
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY not configured')
    }

    const emailContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to the AI Education Revolution</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #1e40af); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6; }
          .button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Registration Confirmed!</h1>
            <p>Welcome to the AI Education Revolution</p>
          </div>
          
          <div class="content">
            <p>Dear ${registration.name},</p>
            
            <p>Thank you for registering for our exclusive AI Education workshop. Your registration has been successfully confirmed!</p>
            
            <div class="info-box">
              <h3>Your Registration Details:</h3>
              <p><strong>Name:</strong> ${registration.name}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              <p><strong>School:</strong> ${registration.school}</p>
              <p><strong>Role:</strong> ${registration.role}</p>
              ${roleSpecificContent}
            </div>
            
            <h3>🚀 What's Next?</h3>
            <ul>
              <li>You will receive session details and joining instructions 24 hours before the workshop</li>
              <li>Preparation materials will be shared via email</li>
              <li>Make sure to add our email to your contacts to avoid missing important updates</li>
            </ul>
            
            <h3>📋 Pre-Workshop Preparation</h3>
            <p>To get the most out of your AI Education workshop experience:</p>
            <ul>
              <li>Ensure you have a stable internet connection</li>
              <li>Prepare any questions about AI integration in education</li>
              <li>Have a notebook ready for key insights and action items</li>
            </ul>
            
            <div class="footer">
              <p>If you have any questions, please don't hesitate to reach out.</p>
              <p><strong>The AI Education Team</strong></p>
              <p><em>Transforming Education Through Artificial Intelligence</em></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const emailRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'AI Education <noreply@yourdomain.com>',
        to: [registration.email],
        subject: '🎉 Registration Confirmed - AI Education Workshop',
        html: emailContent,
      }),
    })

    if (!emailRes.ok) {
      const error = await emailRes.text()
      console.error('Resend API error:', error)
      throw new Error('Failed to send email')
    }

    const emailData = await emailRes.json()
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Welcome email sent successfully',
        emailId: emailData.id 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in send-registration-email function:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
