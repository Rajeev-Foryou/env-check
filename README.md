# env-check 🔒

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
npm install --save-dev env-check
```

### Method 2: Global Installation
```bash
npm install -g env-check
```

### Method 3: Using npx/npm (No Installation Required)
```bash
# Using npx
npx env-check

# Or using npm
npm exec env-check
```

## 🛠️ Setup Guide

### Quick Setup (Recommended)

1. **Install the package**:
   ```bash
   npm install --save-dev env-check
   ```

2. **Test it works**:
   ```bash
   # Using npx
   npx env-check
   
   # Or using npm
   npm exec env-check
   ```

3. **Add to your package.json scripts** (optional):
   ```json
   {
     "scripts": {
       "check-env": "env-check",
       "precommit": "env-check"
     }
   }
   ```

### Advanced Setup with Husky (Team Projects)

For teams wanting automatic protection on every commit:

1. **Install Husky and env-check**:
   ```bash
   npm install --save-dev husky env-check
   ```

2. **Initialize Husky**:
   ```bash
   npx husky install
   ```

3. **Add the pre-commit hook**:
   ```bash
   # Using npx
   npx husky add .husky/pre-commit "npx env-check"
   
   # Or using npm
   npm exec husky add .husky/pre-commit "npm exec env-check"
   ```

4. **Make hook executable** (Linux/Mac only):
   ```bash
   chmod +x .husky/pre-commit
   ```

5. **Add prepare script to package.json**:
   ```json
   {
     "scripts": {
       "prepare": "husky install"
     }
   }
   ```

### Manual Git Hook Setup (Alternative)

If you prefer not to use Husky:

1. **Create the hook file**:
   ```bash
   touch .git/hooks/pre-commit
   chmod +x .git/hooks/pre-commit
   ```

2. **Add this content to `.git/hooks/pre-commit`**:
   ```bash
   #!/bin/sh
   # Using npx
   npx env-check
   
   # Or using npm
   # npm exec env-check
   ```

## 🔧 Usage

### Command Line Usage

**Basic check** (checks currently staged files):
```bash
env-check
```

**Using npx/npm** (if not installed globally):
```bash
# Using npx
npx env-check

# Or using npm
npm exec env-check
```

**In npm scripts**:
```bash
npm run check-env
```

### Integration Examples

**In your CI/CD pipeline** (`.github/workflows/ci.yml`):
```yaml
- name: Check for sensitive files
  run: |
    # Using npx
    npx env-check
    # Or using npm
    # npm exec env-check
```

**In your package.json**:
```json
{
  "scripts": {
    "precommit": "env-check",
    "test": "env-check && jest",
    "build": "env-check && webpack"
  }
}
```

## 🚨 How It Works

1. **Scans staged files**: When you run `git commit`, the tool examines all staged files
2. **Pattern matching**: Compares filenames against known sensitive file patterns
3. **Security check**: If sensitive files are found:
   - 🛑 **Blocks the commit** with exit code 1
   - 📋 **Lists all problematic files** with clear formatting
   - 💡 **Provides guidance** on how to resolve the issue
4. **Safe commits**: If no sensitive files detected, commit proceeds normally

## 📋 Detected File Patterns

The tool automatically detects these sensitive file types:

| Pattern | Description | Examples |
|---------|-------------|----------|
| `.env*` | Environment files | `.env`, `.env.local`, `.env.production` |
| `*.pem` | SSL certificates | `certificate.pem`, `private.pem` |
| `*.key` | Private keys | `server.key`, `private.key` |
| `*.crt` | Certificate files | `ssl.crt`, `ca.crt` |
| `id_rsa*` | SSH keys | `id_rsa`, `id_rsa.pub` |
| `*credentials*.json` | Service credentials | `credentials.json`, `gcp-credentials.json` |
| `firebase*.json` | Firebase configs | `firebase-adminsdk.json` |
| `secrets*` | Secret files | `secrets.yml`, `secrets.json` |
| `*.p12` | PKCS#12 files | `certificate.p12` |
| `*.keystore` | Java keystores | `app.keystore` |

## 📺 Example Output

### ✅ Safe Commit (No sensitive files)
```bash
$ git commit -m "Add new feature"
# (no output from env-check, commit proceeds)
```

### ⛔ Blocked Commit (Sensitive files detected)
```bash
$ git commit -m "Update config"
⛔  Potential Security Risk: Sensitive files are staged!
 - .env
 - config/secrets.json
 - ssl/private.key

❗ Please unstage or remove these files from the commit to avoid leaking secrets.
```

## 🔧 Troubleshooting

### Common Issues

**"Not a git repository" error**:
- Ensure you're running the command in a Git repository
- Run `git init` if needed

**Hook not executing**:
- Check hook permissions: `chmod +x .husky/pre-commit`
- Verify Husky installation: `npx husky install` or `npm exec husky install`

**False positives**:
- The tool is designed to be conservative for security
- Consider renaming files that match sensitive patterns
- Add files to `.gitignore` if they shouldn't be committed

### Getting Help

If you encounter issues:
1. Check that you're in a Git repository
2. Ensure Node.js version >= 14
3. Verify the tool works manually: `npx env-check` or `npm exec env-check`
4. Check our [Issues page](https://github.com/Rajeev-Foryou/env-check/issues)

## 🏗️ Project Structure

```
env-check/
├── index.js              # Main CLI application
├── package.json          # Package configuration
├── README.md             # This documentation
├── LICENSE               # MIT license
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
└── hooks/
    └── pre-commit        # Sample Git hook
```

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**: `npm test`
5. **Commit your changes**: `git commit -m 'Add amazing feature'`
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Development Setup

```bash
# Clone your fork
git clone https://github.com/Rajeev-Foryou/env-check.git
cd env-check

# Install dependencies
npm install

# Test the CLI
npm link
env-check

# Run in development
node index.js
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🛡️ Security Benefits

- **Prevents credential leaks** before they reach your repository
- **Protects API keys** and database connections
- **Safeguards SSL certificates** and private keys
- **Blocks service account files** from accidental commits
- **Maintains security compliance** in team environments
- **Reduces security incidents** and emergency credential rotations

## 🌟 Why Use env-check?

- **Proactive Security**: Catches issues before they become problems
- **Team Safety**: Protects entire teams from accidental leaks
- **Zero Maintenance**: Set it up once, works automatically
- **Lightweight**: Minimal dependencies, fast execution
- **Universal**: Works with any Node.js project
- **Open Source**: Transparent, auditable, community-driven

---

**Made with ❤️ for secure development practices**

Repository: ["https://github.com/Rajeev-Foryou/env-check.git"]
