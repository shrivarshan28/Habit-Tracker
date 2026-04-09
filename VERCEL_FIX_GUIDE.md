# Vercel Deployment Troubleshooting Guide

## ❌ Problem
Login/Register works on `localhost:5000` but fails on Vercel deployed URL with server errors.

## ✅ Solution

### The Main Issue: Missing Environment Variables on Vercel

When you push code to GitHub and Vercel auto-deploys, **environment variables are NOT automatically transferred**. Your `.env` file is in `.gitignore` (correctly, for security), so Vercel doesn't have access to them.

### Step-by-Step Fix

#### 1. Go to Vercel Dashboard
- Navigate to [https://vercel.com/dashboard](https://vercel.com/dashboard)
- Select your Habit Tracker project

#### 2. Add Environment Variables
- Click on **Settings** in the top menu
- Select **Environment Variables** from the left sidebar

#### 3. Add Each Variable (Set for Production)

Add the following variables one by one:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://shrivarshan28_dbuser:Shrivarshan123!@habit-tracker.uce8xmu.mongodb.net/?appName=habit-tracker` |
| `JWT_SECRET` | `your_super_secret_key_change_this_in_production` |
| `NODE_ENV` | `production` |
| `EMAIL_USER` | `sit19cs102@sairamtap.edu.in` |
| `EMAIL_PASSWORD` | `your_email_password_here` |
| `EMAIL_SMTP_HOST` | `smtp.outlook.com` |
| `EMAIL_SMTP_PORT` | `587` |

**For each one:**
1. Click **Add New**
2. Enter the variable name in the first field
3. Enter the value in the second field
4. Make sure **Production** is selected
5. Click **Save**

#### 4. Redeploy
After adding all variables, redeploy:

**Option A: Manual Redeploy**
1. Go to **Deployments** tab
2. Find your latest deployment
3. Click the three dots (**...**)
4. Click **Redeploy**

**Option B: Auto Redeploy via Git Push**
```bash
git add .
git commit -m "Fix: Updated CORS configuration for Vercel"
git push origin main
```

---

## 🔍 Test After Deployment

### 1. Check Server Health
Open in your browser:
```
https://your-vercel-url.vercel.app/api/health
```

You should see:
```json
{
  "status": "OK",
  "environment": "production",
  "mongodb": "Connected",
  "timestamp": "2026-04-09T..."
}
```

### 2. Test Registration
Go to `https://your-vercel-url.vercel.app/pages/register.html`
- Fill in the form
- Click Register
- Should see success message and redirect to dashboard

### 3. Test Login
Go to `https://your-vercel-url.vercel.app/pages/login.html`
- Use credentials from registration
- Should login successfully

---

## 🐛 Debugging Common Issues

### Issue: Still Getting Server Errors

**Check the browser console (F12):**
1. Open DevTools (F12)
2. Go to **Console** tab
3. Look for error messages
4. Go to **Network** tab and check API requests

**Common fixes:**
- Verify all 7 environment variables are set in Vercel
- Wait 5+ minutes after setting variables for Vercel to rebuild
- Check that values don't have extra spaces

### Issue: Database Connection Error
- Verify `MONGODB_URI` is correct and includes password
- Make sure MongoDB Atlas cluster is active
- Check if IP whitelist includes Vercel (usually 0.0.0.0/0 for "anywhere")

### Issue: Authentication Token Errors
- Verify `JWT_SECRET` matches between deployments
- Clear browser localStorage and try again
- Check that token is being saved in localStorage

---

## 📝 What Changed

**File**: `backend/server.js`
- Added flexible CORS configuration for multiple origins
- Added `/api/health` endpoint for status checking
- NODE_ENV handling for production vs development

---

## 🚀 Future Deployments

After this fix, future deployments will work automatically because:
1. Vercel stores your environment variables persistently
2. Each new push to GitHub triggers auto-deployment with correct variables
3. No additional setup needed for subsequent changes

**Just remember:** If you update `.env` locally, update Vercel's environment variables too!

---

## 💡 Pro Tips

- **Never commit `.env` to Git** (it's in `.gitignore` for a reason)
- **Store sensitive keys in Vercel dashboard**, not in code
- **Use different secrets for production vs development**
- **Regularly rotate JWT_SECRET for security**
