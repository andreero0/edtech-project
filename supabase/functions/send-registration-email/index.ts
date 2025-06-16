
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationEmailRequest {
  name: string;
  email: string;
  school: string;
  role: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, school, role }: RegistrationEmailRequest = await req.json();

    console.log(`Sending registration email to ${email} for ${name}`);

    // Use a more generic sender address that can be updated when domain is verified
    const fromAddress = "AI Education Revolution <noreply@yourdomain.com>";
    
    const emailResponse = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: "🎯 Welcome to the AI Education Revolution - Your Spot is Secured!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to AI Education Revolution</title>
          </head>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🚀 AI Education Revolution</h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">Your journey into the future of education starts here</p>
            </div>
            
            <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
              <h2 style="color: #1f2937; margin-top: 0;">Welcome, ${name}! 🎉</h2>
              
              <p style="font-size: 16px; margin-bottom: 20px;">
                <strong>Congratulations!</strong> Your spot has been successfully secured for the AI Education Revolution session.
              </p>
              
              <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
                <h3 style="margin: 0 0 10px 0; color: #1e40af;">📋 Your Registration Details:</h3>
                <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>School:</strong> ${school}</p>
                <p style="margin: 5px 0;"><strong>Role:</strong> ${role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ')}</p>
                <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
              </div>
              
              <h3 style="color: #1f2937; margin-top: 25px;">🔥 What Happens Next?</h3>
              <ul style="padding-left: 20px;">
                <li style="margin-bottom: 8px;">We'll send you session details and preparation materials within 24 hours</li>
                <li style="margin-bottom: 8px;">You'll receive a WhatsApp invitation to join our exclusive educator community</li>
                <li style="margin-bottom: 8px;">Access to pre-session resources to maximize your learning experience</li>
                <li style="margin-bottom: 8px;">Direct line to our AI education specialists for any questions</li>
              </ul>
              
              <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; font-weight: bold; color: #92400e;">
                  💡 Pro Tip: Start thinking about specific challenges in your school that AI could help solve. We'll be diving deep into practical applications!
                </p>
              </div>
              
              <h3 style="color: #1f2937;">🎯 Session Preview:</h3>
              <ul style="padding-left: 20px;">
                <li style="margin-bottom: 8px;">Hands-on AI tools demonstration</li>
                <li style="margin-bottom: 8px;">Personalized implementation strategies for your school</li>
                <li style="margin-bottom: 8px;">Live Q&A with AI education experts</li>
                <li style="margin-bottom: 8px;">Exclusive resources and templates</li>
                <li style="margin-bottom: 8px;">Networking with forward-thinking educators</li>
              </ul>
              
              <div style="text-align: center; margin: 30px 0;">
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 15px 25px; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
                  ✅ You're All Set! We'll Be In Touch Soon.
                </div>
              </div>
              
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 25px 0;">
              
              <p style="font-size: 14px; color: #6b7280; text-align: center; margin-bottom: 5px;">
                Questions? Reply to this email or contact us directly.
              </p>
              <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">
                🔒 Your information is secure and will never be shared with third parties.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    console.log("Registration email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      messageId: emailResponse.data?.id 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-registration-email function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
