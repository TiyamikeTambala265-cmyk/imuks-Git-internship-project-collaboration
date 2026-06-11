# Imuks-Git-internship-project-collaboration
This is an internship attactment ment to encourage collaboration and team building  

This repository is part of an internship attachment meant to encourage collaboration and team building.  
It contains a **monorepo** setup with both a Next.js web app and a React Native mobile app.

---

## 📂 Project Structure
repo-root/
├── apps/
│    ├── web/          # Next.js app
│    └── mobile/       # React Native app
├── packages/          # Shared code (components, utils, etc.)
├── tests/             # Centralized test configs
├── .github/           # Workflows and PR templates
├── README.md


---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <repo-url>
cd Imuks-Git-internship-project-collaboration
```
Install dependencies
```bash
yarn install
```
Run Next.js (web)
```bash
cd apps/web
yarn dev
```
NOTE:App runs at: http://localhost:3000

Run React Native (mobile)
```bash
cd apps/mobile
yarn start
```
Then run on emulator or device:
```bash
yarn android
yarn ios
```
NOTE: If your pc is not powerfull enough for emulation or you just want to use your phone, you can connect your phone to the pc after turing on developers mode depending on which platform your own, watch some tutorials for more information.

COLLABORATION RULES YOU MUST FOLLOW AT ALL TIMES

 No direct pushes to the main branch
  All changes must go through a pull request

Tests required for new code 
 Add or update tests for every feature/fix
 CI will block merges if tests fail

Code review checklist
 Ensure no merge conflicts
 Follow coding standards and lint rules
 Use the PR template checklist

Testing
 Web(Next.js)
 ```bash
 cd apps/web
yarn test
```
Mobile (React Native):
```bash
cd apps/mobile
yarn test
```
Branch Protection
The Main branch is protected 
Requires PR approval and passing status checks before merge
Force pushes and deletions are blocked


License
his project is licensed under the MIT License


---

### 📌 How to Add This
1. On GitHub, go to your repo.  
2. Click **Add file → Create new file**.  
3. Name it `README.md`.  
4. Paste the full template above.  
5. Commit the file to your repo (on a branch, not directly to `main`).  
6. Open a Pull Request → reviewers approve → merge into `main`.

 

 
