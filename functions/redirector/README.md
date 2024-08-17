# Redirector

A simple Cloud function that redirects back to your app with the necessary query parameters.

## 🧰 Usage

### GET /

- Redirects to the app scheme with the necessary query parameters.

**Parameters**

| Name   | Description               | Location | type   | Sample Value |
| ------ | ------------------------- | -------- | ------ | ------------ |
| scheme | App Scheme to redirect to | Query    | string | rnauth://    |

### POST, PUT, PATCH, DELETE /

- Returns `405 Method Not Allowed` error.

## ⚙️ Configuration

| Setting           | Value           |
| ----------------- | --------------- |
| Runtime           | Dart (3.1)      |
| Entrypoint        | `lib/main.dart` |
| Build Commands    | `dart pub get`  |
| Permissions       | `any`           |
| Timeout (Seconds) | 15              |

## 🔒 Environment Variables

`APP_SCHEME` - Whitelisted app scheme
