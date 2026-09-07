class EmailService {
    constructor() {
        this.isProduction = false;
        this.publicKey = 'oIzl4RHrfOtpbyh72';
        
        this.contactServiceId = 'service_fymwtjg';
        this.verificationServiceId = 'service_7wou84xg';
        
        this.contactTemplateId = 'template_nwy232w';
        this.verificationTemplateId = 'template_xf2hnch';
        this.passwordResetTemplateId = 'template_xf2hnch';
        
        this.initEmailJS();
        this.setupVerificationTemplates();
    }

    async initEmailJS() {
        try {
            if (!window.emailjs) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
                document.head.appendChild(script);
                
                await new Promise((resolve) => {
                    script.onload = resolve;
                });
            }
            
            emailjs.init(this.publicKey);
        } catch (error) {
            console.error('Failed to initialize EmailJS:', error);
        }
    }

    setupVerificationTemplates() {
        this.templates = {
            verification: {
                subject: 'Verify Your Watillery Account',
                html: (token, name) => `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0;">
                            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Watillery!</h1>
                        </div>
                        <div style="background: white; padding: 30px; border: 1px solid #E5E7EB; border-radius: 0 0 12px 12px;">
                            <h2 style="color: #111827; margin-bottom: 20px;">Hi ${name},</h2>
                            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
                                Thank you for joining Watillery! To complete your registration and start shopping for premium water artillery, please verify your email address.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${this.getVerificationUrl(token)}" 
                                   style="background: linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); 
                                          color: white; 
                                          padding: 15px 30px; 
                                          text-decoration: none; 
                                          border-radius: 8px; 
                                          font-weight: 600;
                                          display: inline-block;">
                                    Verify Email Address
                                </a>
                            </div>
                            <p style="color: #6B7280; font-size: 14px;">
                                If you didn't create an account with Watillery, you can safely ignore this email.
                            </p>
                            <p style="color: #6B7280; font-size: 14px;">
                                This verification link will expire in 24 hours.
                            </p>
                        </div>
                    </div>
                `
            }
        };
    }

    getVerificationUrl(token) {
        const base = this.isProduction
            ? 'https://watillery.com/'
            : `${window.location.origin}${window.location.pathname}`;
        return `${base}?token=${token}`;
    }

    async sendContactForm(formData) {
        try {
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Watillery Team',
            };

            const response = await emailjs.send(
                this.contactServiceId,
                this.contactTemplateId,
                templateParams
            );

            return { success: true, response };
        } catch (error) {
            console.error('Contact email send failed:', error);
            return { success: false, error };
        }
    }

    async sendVerificationEmail(email, name, token) {
        try {
            const templateParams = {
                to_email: email,
                to_name: name,
                verification_link: this.getVerificationUrl(token),
                from_name: 'Watillery Team'
            };

            const response = await emailjs.send(
                this.verificationServiceId,
                this.verificationTemplateId,
                templateParams
            );
            
            return {
                success: true,
                message: 'Verification email sent successfully',
                verificationUrl: this.getVerificationUrl(token),
                response: response
            };
        } catch (error) {
            console.error('Verification email sending failed:', error);
            return {
                success: false,
                message: 'Failed to send verification email',
                error: error
            };
        }
    }

    async sendPasswordResetEmail(email, token) {
        try {
            const templateParams = {
                to_email: email,
                reset_link: `${window.location.origin}?reset_token=${token}`,
                from_name: 'Watillery Team'
            };

            const response = await emailjs.send(
                this.verificationServiceId,
                this.passwordResetTemplateId,
                templateParams
            );

            return { success: true, response };
        } catch (error) {
            console.error('Password reset email failed:', error);
            return { success: false, error };
        }
    }

    async subscribeNewsletter(email) {
        try {
            const templateParams = {
                subscriber_email: email,
                to_name: 'Watillery Team',
                from_name: 'New Subscriber'
            };

            const response = await emailjs.send(
                this.newsletterServiceId,
                this.newsletterTemplateId,
                templateParams
            );

            return { success: true, response };
        } catch (error) {
            console.error('Newsletter subscription failed:', error);
            return { success: false, error };
        }
    }

    async sendOrderConfirmation(orderData) {
        try {
            const templateParams = {
                to_email: orderData.customerEmail,
                to_name: orderData.customerName,
                order_id: orderData.orderId,
                order_total: orderData.total,
                order_items: orderData.items.map(item => 
                    `${item.name} (${item.selectedColor}) x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
                ).join('\n'),
                from_name: 'Watillery Team'
            };

            const response = await emailjs.send(
                this.orderServiceId,
                this.orderConfirmationTemplateId,
                templateParams
            );

            return { success: true, response };
        } catch (error) {
            console.error('Order confirmation email failed:', error);
            return { success: false, error };
        }
    }
}

const emailService = new EmailService();
window.emailService = emailService;