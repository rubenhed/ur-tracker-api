# UR Tracker

Cloudflare Worker that tracks UR listings and sends email notifications.

## Setup

### 1. Install Wrangler and log in

Get a [Cloudflare](https://www.cloudflare.com/) account, then install Wrangler globally:

```bash
npm install -g wrangler
```

Log in:

```bash
wrangler login
```

### 2. Create your KV namespace

Delete the existing `kv_namespaces` section from `wrangler.jsonc`:

```json
"kv_namespaces": [
  {
    "binding": "UR_ROOMS",
    "id": "...",
    "remote": true
  }
],
```

Then create your own:

```bash
wrangler kv namespace create UR_ROOMS
```

Wrangler should add the KV configuration to `wrangler.jsonc` automatically. **Double-check that `UR_ROOMS` is present with your new namespace ID.**

### 3. Configure your email

Create a [Resend](https://resend.com) account if you don't already have one. Resend is an email-sending API service.

Change `NOTIFY_EMAILS` in `wrangler.jsonc` to the email you used to sign up for Resend. Resend free dev tier only allows sending to your registered email.

```json
"vars": {
  "NOTIFY_EMAILS": "your@email.com"
},
```

### 4. Add your Resend API key

Get your API key from the Resend dashboard after logging in:

```bash
wrangler secret put RESEND_API_KEY
```

Paste your Resend API key when prompted.

### 5. Deploy

```bash
wrangler deploy
```

## Notes

- **Filters:** You can change the search filters in `src/lib/fetch-rooms.ts`. The parameters correspond to the search options used by the official UR website. Current settings are **50m²+** and Tokyo's 23 wards only.
- **Ntfy:** Ntfy is an mobile app you can use to send notifications. It didnt work well hosted on cloudflare, probably because a lot of people use same the ip address, so we all get rate limited. Ntfy notifications are already commented out and can be ignored.
- **Cron:** With the current base settings, the Worker runs every 2 minutes from **05:00–23:59 JST**.
- **KV(Key value):** KV is only used to compare room IDs and detect new listings. You could expand this to a database if you want to store historical data.
