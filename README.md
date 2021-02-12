# clubhouse-web

This is an incomplete attempt at making a clubhouse web client.

Clubhouse uses agora.io to handle real time audio.

### https://clubhouseapi.com/api/login ??

Sadly I forgot to save the exact endpoint names that are used to login. Pls help me out here.

You post your phone number to this endpoint and it texts you a code.

You send the code back and it gives you an Authorization token you add to your header.

### https://clubhouseapi.com/api/join_channel

Post a JSON blob containing the channel_id.

Extract the agora token from the response and use it to join the channel

### https://clubhouseapi.com/api/me ??

I forget if this is the correct endpoint. It gives you your user ID which you need to join the agora channel
