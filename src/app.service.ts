import { Injectable } from '@nestjs/common';
import configuration from './config/env.validation';

const config = configuration();

@Injectable()
export class AppService {
  getHomePage(): string {
    return `
      <html style="height: 100%;">
        <body style="margin: 0; height: 100vh; font-family: sans-serif; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <h1>Restaurant Finder App</h1>
          <form 
            onsubmit="handleSubmit(event)" 
            style="display: flex; flex-direction: column; justify-content: center; align-items: center;"
          >
            <input
              id="access-code"
              type="password"
              placeholder="Enter the access code to use this app"
              style="padding: 5px; width: 350px; outline: none;"
            />
            <textarea
              id="user-prompt"
              rows="4"
              placeholder="Describe the place you are searching for"
              style="padding: 5px; width: 350px; resize: vertical; margin-top: 20px;"
            ></textarea>
            <button 
              type="submit" 
              style="margin-top: 20px; padding: 8px 16px; width:350px;"
            >Search</button>
          </form>
          <script>
            function handleSubmit(e) {
              e.preventDefault();
              const code = document.getElementById('access-code').value;
              const prompt = document.getElementById('user-prompt').value;
              if (!code || !prompt) {
                alert('All fields are required.');
                return;
              }
              if (code !== "${config.auth.authCode}") {
                alert('Invalid access code.');
                return;
              }
              const query = new URLSearchParams({ code, message: prompt }).toString();
              window.location.href = '/restaurant?' + query;
            }
          </script>
        </body>
      </html>
    `;
  }
}
