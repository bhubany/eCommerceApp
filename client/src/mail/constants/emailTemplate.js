export const VERIFY_REGISTRATION_EMAIL = {
  from_email: 'ecommerce.bhuban@gmail.com',
  from_name: 'Infinity Shop',
  subject: 'Verify Your Email',
  content: `
  <!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Infinity Shop</title> </head> <body style=" margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; width: 900px; margin: auto; " > <div style="border: solid #1976d2 15px"> <div style="height: 64px; background-color: #1976d2; text-align: center; color: #fff"> <h1 style="padding: 0; margin: 0; font-size: 50px">INFINITY SHOP</h1> </div> <div> <div style="text-align: center; margin-top: 32px"> <h1 style="padding: 0; margin: 0; color: #1976d2">Registration Success</h1> </div> <div style="text-align: center; padding: 16px 0; margin-bottom: 16px"> <div style="width: 50%; margin: 32px auto; border: solid #1976d2 3px; padding: 32px"> <p style="line-height: 24px"> Hey {{fname}} Your account hasbeen registered sucessfully. Please cleack the below button to verify it </p> <a href="{{verification_link}}" style=" padding: 16px 32px; border-radius: 8px; color: #fff; background-color: #1976d2; border-color: #1976d2; font-size: 20px; text-decoration: none; line-height: 50px; " > Verify</a > </div> </div> </div> <div style=" height: 32px; background-color: #1976d2; color: #fff; text-align: center; padding: 8px 0; " > <p> Contact us at:<a href="mailto:ecommerce.bhuban@gmail.com" style="text-decoration: none; color: burlywood" > ecommerce.bhuban@gmail.com</a > </p> </div> </div> </body></html>
  `,
};

export const ORDER_DETAILS_EMAIL = {
  from_email: 'ecommerce.bhuban@gmail.com',
  from_name: 'Infinity Shop',
  subject: 'Order placed sucessfully',
  content: `
  <!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8" /> <meta http-equiv="X-UA-Compatible" content="IE=edge" /> <meta name="viewport" content="width=device-width, initial-scale=1.0" /> <title>Infinity Shop</title> </head> <body style=" margin: 0; padding: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; width: 900px; margin: auto; " > <div style="border: solid #1976d2 15px"> <div style="height: 64px; background-color: #1976d2; text-align: center; color: #fff"> <h1 style="padding: 0; margin: 0; font-size: 50px">INFINITY SHOP</h1> </div> <div> <div style="text-align: center; margin-top: 32px"> <h1 style="padding: 0; margin: 0; color: #1976d2">Order Placed Successfully</h1> </div> <div style="text-align: center; padding: 16px 0; margin-bottom: 16px"> <div style="width: 50%; margin: 32px auto; border: solid #1976d2 3px; padding: 32px"> <p style="line-height: 24px"> Hey {{fname}} Your order hasbeen placed sucessfully. Please cleack the below order details. </p> </div> </div> <div style="margin: 1rem">{{{table}}}</div> </div> <div style=" height: 32px; background-color: #1976d2; color: #fff; text-align: center; padding: 8px 0; " > <p> Contact us at:<a href="mailto:ecommerce.bhuban@gmail.com" style="text-decoration: none; color: burlywood" > ecommerce.bhuban@gmail.com</a > </p> </div> </div> </body></html>
  `,
};
