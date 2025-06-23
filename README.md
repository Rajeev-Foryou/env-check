# staging-check 🔒

A robust Node.js CLI tool that prevents accidental commits of sensitive environment files and credentials by automatically blocking Git commits when dangerous files are staged.

## 🚀 Features

- **Comprehensive Protection**: Detects `.env*` files, SSL certificates, private keys, and other sensitive files
- **Smart Pattern Matching**: Recognizes various sensitive file patterns including:
  - Environment files (`.env`, `.env.local`, `.env.production`, etc.)
  - SSL certificates (`.pem`, `.crt`, `.key`)
  - SSH keys (`id_rsa`, `id_rsa.pub`)
  - Service account files (`credentials.json`, `firebase*.json`)
  - And many more security-sensitive patterns
- **Zero Configuration**: Works out of the box with sensible defaults
- **Clear Visual Warnings**: Colorful terminal output with detailed file listings
- **Git Integration**: Seamlessly integrates with Git pre-commit hooks
- **Husky Compatible**: Perfect companion for Husky-based workflows

## 📦 Installation

### Method 1: As a Development Dependency (Recommended)

```bash
npm install --save-dev staging-check
```

### Method 2: Global Installation

```bash
npm install -g staging-check
```

### Method 3: Using npx/npm (No Installation Required)

```bash
# Using npx
npx staging-check

# Or using npm
npm exec staging-check
```

## 🛠️ Setup Guide

### Quick Setup (Recommended)

1. **Install the package**:

   ```bash
   npm install --save-dev staging-check
   ```

2. **Test it works**:

   ```bash
   npx staging-check
   # Or
   npm exec staging-check
   ```

3. **Add to your package.json scripts** (optional):

   ```json
   {
     "scripts": {
       "check-env": "staging-check",
       "precommit": "staging-check"
     }
   }
   ```

### Advanced Setup with Husky

```bash
npm install --save-dev husky staging-check
npx husky install
npx husky add .husky/pre-commit "npx staging-check"
chmod +x .husky/pre-commit
```

Add this to `package.json`:

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### Manual Git Hook

```bash
touch .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit
```

Inside `.git/hooks/pre-commit`:

```bash
#!/bin/sh
npx staging-check
# or
# npm exec staging-check
```

## 🔧 Usage

```bash
staging-check
npx staging-check
npm exec staging-check
```

**CI/CD example**:

```yaml
- name: Check for sensitive files
  run: |
    npx staging-check
```

In `package.json`:

```json
{
  "scripts": {
    "precommit": "staging-check",
    "test": "staging-check && jest",
    "build": "staging-check && webpack"
  }
}
```

## 🚨 How It Works

1. Scans staged files
2. Detects sensitive patterns
3. Blocks commits and shows a warning
4. Allows commit if safe

### Patterns Detected

| Pattern              | Description         |
|----------------------|---------------------|
| `.env*`              | Environment files   |
| `*.pem`, `*.crt`     | SSL certificates    |
| `*.key`              | Private keys        |
| `id_rsa*`            | SSH keys            |
| `*credentials*.json` | Service credentials |
| `firebase*.json`     | Firebase configs    |
| `secrets*`           | Secrets             |
| `*.p12`              | PKCS#12 certs       |
| `*.keystore`         | Java keystores      |

### Safe Example

```bash
$ git commit -m "Add new feature"
# (no output, commit passes)
```

### Blocked Example

```bash
$ git commit -m "Update config"
⛔ Potential Security Risk: Sensitive files are staged!
 - .env
 - secrets.json
 - ssl/private.key
❗ Please unstage or remove these files before committing.
```

## 🛠️ Troubleshooting

- Ensure you're in a git repo
- `chmod +x` on pre-commit hooks
- Check Node.js version ≥ 14
- Still stuck? See [Issues](https://github.com/Rajeev-Foryou/env-check/issues)

## 🏗️ Project Structure

```
staging-check/
├── index.js
├── package.json
├── README.md
├── LICENSE
├── .env.example
├── .gitignore
└── hooks/
    └── pre-commit
```

## 🤝 Contributing

```bash
git clone https://github.com/Rajeev-Foryou/env-check.git
cd staging-check
npm install
npm link
staging-check
node index.js
```

## 📄 License

MIT — see the [LICENSE](LICENSE) file.

## 🛡️ Security Benefits

- Prevents credential leaks
- Protects private keys and API tokens
- Blocks service accounts
- Helps with compliance
- Saves teams from dangerous commits

---

**Made with ❤️ for secure development workflows**

Repository: ["https://github.com/Rajeev-Foryou/env-check.git"]
