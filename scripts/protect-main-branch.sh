#!/bin/bash

# Branch Protection Setup Script
# This script helps you protect the main branch

REPO="adityaarakal/expense-manager"
BRANCH="main"

echo "🛡️ Branch Protection Setup for $REPO"
echo "=================================="
echo ""

# Check if gh CLI is available
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "❌ Not authenticated with GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo "📋 Available Methods:"
echo "1. Automated Workflow (Recommended for public repos or GitHub Pro)"
echo "2. Manual GitHub Web Interface (Works for all repos)"
echo "3. GitHub CLI (For public repos or GitHub Pro)"
echo ""

read -p "Choose method (1-3): " method

case $method in
    1)
        echo "🚀 Running automated branch protection workflow..."
        gh workflow run branch-protection.yml \
          --field branch_name=$BRANCH \
          --field required_reviewers=1 \
          --field require_pr_reviews=true \
          --field dismiss_stale_reviews=true \
          --field require_status_checks=true \
          --field enforce_admins=true
        
        echo "✅ Workflow started! Check Actions tab for progress."
        ;;
    2)
        echo "🌐 Manual Setup Instructions:"
        echo ""
        echo "1. Go to: https://github.com/$REPO/settings/branches"
        echo "2. Click 'Add rule'"
        echo "3. Enter branch name: $BRANCH"
        echo "4. Configure these settings:"
        echo "   ✅ Require status checks to pass before merging"
        echo "   ✅ Require branches to be up to date before merging"
        echo "   ✅ Required status checks:"
        echo "      - Code Quality & Standards"
        echo "      - Test Coverage (100% Required)"
        echo "      - Architecture Standards"
        echo "      - Build & Production Check"
        echo "      - Security & Dependencies"
        echo "   ✅ Require a pull request before merging"
        echo "   ✅ Required reviewers: 1"
        echo "   ✅ Dismiss stale PR approvals when new commits are pushed"
        echo "   ✅ Include administrators"
        echo "5. Click 'Create'"
        echo ""
        echo "📖 Full guide: docs/workflows/BRANCH_PROTECTION_GUIDE.md"
        ;;
    3)
        echo "🔧 Setting up branch protection via GitHub CLI..."
        
        # Check if repository is public or user has Pro
        echo "📋 Checking repository access..."
        
        if gh api repos/$REPO/branches/$BRANCH/protection \
          --method PUT \
          --field required_status_checks='{"strict":true,"contexts":["Code Quality & Standards","Test Coverage (100% Required)","Architecture Standards","Build & Production Check","Security & Dependencies"]}' \
          --field enforce_admins=true \
          --field required_pull_request_reviews='{"required_approving_review_count":1,"dismiss_stale_reviews":true}' \
          --field restrictions=null \
          --field allow_force_pushes=false \
          --field allow_deletions=false; then
            
            echo "✅ Branch protection configured successfully!"
        else
            echo "❌ Failed to set up branch protection via CLI."
            echo "This might be because:"
            echo "  • Repository is private and you don't have GitHub Pro"
            echo "  • Insufficient permissions"
            echo ""
            echo "💡 Try Method 2 (Manual GitHub Web Interface) instead."
        fi
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1, 2, or 3."
        exit 1
        ;;
esac

echo ""
echo "🔍 Verification Steps:"
echo "1. Check branch protection: gh api repos/$REPO/branches/$BRANCH/protection"
echo "2. Test protection by trying to push directly to main (should fail)"
echo "3. Create a PR instead (should work)"
echo ""
echo "📚 Documentation: docs/workflows/BRANCH_PROTECTION_GUIDE.md"
