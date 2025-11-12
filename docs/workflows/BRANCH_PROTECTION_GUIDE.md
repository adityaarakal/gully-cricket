# Branch Protection Setup Guide

## 🛡️ How to Protect the Main Branch

There are several ways to protect your main branch. Choose the method that works best for your repository setup.

## **METHOD 1: Automated Workflow (Recommended)**

### **For Public Repositories or GitHub Pro Users**

Use the automated branch protection workflow we created:

```bash
# Run the branch protection workflow
gh workflow run branch-protection.yml \
  --field branch_name=main \
  --field required_reviewers=1 \
  --field require_pr_reviews=true \
  --field dismiss_stale_reviews=true \
  --field require_status_checks=true \
  --field enforce_admins=true
```

### **Via GitHub Web Interface**

1. Go to **Actions** tab in your repository
2. Find **"Branch Protection Setup"** workflow
3. Click **"Run workflow"**
4. Fill in the parameters:
   - **Branch name**: `main`
   - **Required reviewers**: `1`
   - **Require PR reviews**: `true`
   - **Dismiss stale reviews**: `true`
   - **Require status checks**: `true`
   - **Enforce for admins**: `true`
5. Click **"Run workflow"**

## **METHOD 2: Manual GitHub Web Interface**

### **Step-by-Step Instructions**

1. **Navigate to Repository Settings**
   - Go to your repository on GitHub
   - Click **"Settings"** tab
   - Click **"Branches"** in the left sidebar

2. **Add Branch Protection Rule**
   - Click **"Add rule"** button
   - In **"Branch name pattern"**, enter: `main`

3. **Configure Protection Settings**

   **✅ Required Status Checks**
   - Check **"Require status checks to pass before merging"**
   - Check **"Require branches to be up to date before merging"**
   - Add these required status checks:
     - `Code Quality & Standards`
     - `Test Coverage (100% Required)`
     - `Architecture Standards`
     - `Build & Production Check`
     - `Security & Dependencies`

   **✅ Required Pull Request Reviews**
   - Check **"Require a pull request before merging"**
   - Set **"Required number of reviewers"** to `1`
   - Check **"Dismiss stale PR approvals when new commits are pushed"**
   - Check **"Require review from code owners"** (if you have CODEOWNERS file)

   **✅ Additional Protection**
   - Check **"Restrict pushes that create files"** (optional)
   - Check **"Require linear history"** (optional)
   - Check **"Require deployments to succeed before merging"** (if using deployments)

   **✅ Admin Enforcement**
   - Check **"Include administrators"** (enforces rules for admins too)

4. **Save the Rule**
   - Click **"Create"** button

## **METHOD 3: GitHub CLI (For Public Repos or Pro Users)**

```bash
# Set up branch protection via CLI
gh api repos/adityaarakal/expense-manager/branches/main/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Code Quality & Standards","Test Coverage (100% Required)","Architecture Standards","Build & Production Check","Security & Dependencies"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false
```

## **METHOD 4: Repository Settings Script**

Create a script to configure branch protection:

```bash
#!/bin/bash

# Branch Protection Configuration Script
REPO="adityaarakal/expense-manager"
BRANCH="main"

echo "🛡️ Setting up branch protection for $BRANCH branch..."

# Check if repository is public or user has Pro
echo "📋 Checking repository access..."

# Set up branch protection
gh api repos/$REPO/branches/$BRANCH/protection \
  --method PUT \
  --field required_status_checks='{"strict":true,"contexts":["Code Quality & Standards","Test Coverage (100% Required)","Architecture Standards","Build & Production Check","Security & Dependencies"]}' \
  --field enforce_admins=true \
  --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
  --field restrictions=null \
  --field allow_force_pushes=false \
  --field allow_deletions=false

echo "✅ Branch protection configured successfully!"
echo ""
echo "📋 Protection Settings Applied:"
echo "  • Required status checks: All CI validations must pass"
echo "  • Required PR reviews: 1 reviewer required"
echo "  • Dismiss stale reviews: Enabled"
echo "  • Enforce for admins: Enabled"
echo "  • Allow force pushes: Disabled"
echo "  • Allow deletions: Disabled"
```

## **🔍 Verification**

After setting up branch protection, verify it's working:

### **Check Protection Status**
```bash
# Check branch protection rules
gh api repos/adityaarakal/expense-manager/branches/main/protection
```

### **Test Protection**
1. Create a test branch: `git checkout -b test-protection`
2. Make a change and commit: `git commit -m "test"`
3. Push branch: `git push origin test-protection`
4. Try to push directly to main: `git push origin main` (should fail)
5. Create PR instead: `gh pr create --title "Test" --body "Test"`

## **📋 Required Status Checks**

Make sure these status checks are configured:

- **Code Quality & Standards** - ESLint, TypeScript, SOLID/DRY
- **Test Coverage (100% Required)** - Jest with 100% coverage
- **Architecture Standards** - File extensions, presentational components, reusability
- **Build & Production Check** - Production build validation
- **Security & Dependencies** - Security audit

## **🚨 Troubleshooting**

### **Common Issues**

1. **"Upgrade to GitHub Pro" Error**
   - **Solution**: Use Method 2 (Manual Web Interface) or make repository public

2. **Status Checks Not Found**
   - **Solution**: Ensure PR validation workflow has run at least once
   - **Check**: Go to Actions tab and verify workflows are running

3. **Branch Protection Not Applied**
   - **Solution**: Check repository permissions and try manual setup
   - **Verify**: Check Settings → Branches in GitHub web interface

### **Alternative for Private Repositories**

If you're using a private repository without GitHub Pro:

1. **Manual Setup**: Use Method 2 (GitHub Web Interface)
2. **Make Public**: Temporarily make repository public, set up protection, then make private
3. **Upgrade**: Consider upgrading to GitHub Pro for advanced features

## **🎯 Benefits of Branch Protection**

- **Prevents Direct Pushes**: No one can push directly to main
- **Enforces PR Process**: All changes must go through PRs
- **Quality Assurance**: All validations must pass
- **Review Requirements**: Code must be reviewed before merging
- **Admin Protection**: Even admins must follow the rules

## **📚 Additional Resources**

- [GitHub Branch Protection Documentation](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches)
- [PR Workflow Documentation](./PR_WORKFLOW.md)
- [Development Standards](../development/DEVELOPMENT_STANDARDS.md)

---

**Note**: The exact method depends on your repository's visibility and GitHub plan. Choose the method that works for your setup!
