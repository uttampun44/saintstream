<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PasswordResetMail extends Mailable
{
    use Queueable, SerializesModels;
   

    /**
     * Create a new message instance.
     */
    public $token;
    public $email;

    public function __construct($token, $email)
    {
      $this->token = $token;
      $this->email = $email;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'SaintStream - Password Reset Mail',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $resetLink = 'https://saintstream-eight.vercel.ap/reset-password?token=' . $this->token;

        return new Content(
            view: 'emails', 
            with: [
                'resetLink' => $resetLink,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
