// import { transporter } from "../config/nodemailer";
import resend from "../config/resend";

interface IEmail {
  email: string;
  name: string;
  token: string;
}

export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const { data, error } = await resend.emails.send({
      from: "TeamTask <admin@teamtask.com>",
      to: [user.email],
      subject: "TeamTask - Confirma tu cuenta",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en TeamTask, casi está listo, solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
      `,
    });

    if (error) {
      console.error("Error al enviar el email de confirmación:", error);
      throw new Error("Error al enviar el email de confirmación");
    }

    console.log("Mensaje enviado", data.id);
  };

  static sendPasswordResendToken = async (user: IEmail) => {
    const { data, error } = await resend.emails.send({
      from: "TeamTask <admin@teamtask.com>",
      to: [user.email],
      subject: "TeamTask - Restablece tu contraseña",
      html: `<p>Hola: ${user.name}, has solicitado restablecer tu contraseña.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Restablecer Contraseña</a>
        <p>E ingresa el código: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
      `,
    });

    if (error) {
      console.error(
        "Error al enviar el email de restablecimiento de contraseña:",
        error
      );
      throw new Error(
        "Error al enviar el email de restablecimiento de contraseña"
      );
    }

    console.log("Mensaje enviado", data.id);
  };
}

/**
export class AuthEmail {
  static sendConfirmationEmail = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TeamTask <admin@teamtask.com>",
      to: user.email,
      subject: "TeamTask - Confirma tu cuenta",
      text: "TeamTask - Confirma tu cuenta",
      html: `<p>Hola: ${user.name}, has creado tu cuenta en TeamTask, casi esta listo, solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirmar cuenta</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado"), info.messageId;
  };

  static sendPasswordResendToken = async (user: IEmail) => {
    const info = await transporter.sendMail({
      from: "TeamTask <admin@teamtask.com>",
      to: user.email,
      subject: "TeamTask - Reestablece tu contraseña",
      text: "TeamTask - Reestablece tu contraseña",
      html: `<p>Hola: ${user.name}, has solicitado reestablecer tu contraseña.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablecer Contraseña</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 10 minutos</p>
      `,
    });

    console.log("Mensaje enviado"), info.messageId;
  };
}
*/
