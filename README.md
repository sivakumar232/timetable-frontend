
We use the **Fork & Pull Request** model for all code contributions.

#### 1. Fork the Repository
Click the **Fork** button at the top right of the [main repository page](https://github.com/sivakumar232/timetable-frontend). This creates your own personal copy of the project.

#### 2. Clone Your Fork Locally
Get the code from your fork onto your computer.

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone [https://github.com/YOUR-USERNAME/timetable-frontend.git](https://github.com/YOUR-USERNAME/timetable-frontend.git)

# Navigate into the newly cloned directory
cd timetable-frontend
```

#### 3. Add the 'Upstream' Remote
Set up a remote connection to the original project repository (`upstream`) to pull in changes and keep your fork updated.

```bash
git remote add upstream [https://github.com/sivakumar232/timetable-frontend.git](https://github.com/sivakumar232/timetable-frontend.git)
```
Verify the remotes: `git remote -v`

#### 4. Create a Feature Branch
Always work on a new branch for each feature or bug fix.

**First, ensure your `develop` branch is up-to-date with the `upstream` project:**

```bash
# Switch to your local develop branch
git checkout develop

# Pull the latest changes from the main project's develop branch
git pull upstream develop
```

**Now, create your new branch from the up-to-date `develop` branch:**

```bash
# Use a descriptive branch name (e.g., 'feat/add-timetable-export')
git checkout -b your-new-feature-branch
```

#### 5. Make and Commit Your Changes
Make your code changes. Ensure your code follows the existing style to maintain consistency.

```bash
# Stage your changes
git add .

# Commit your changes with a clear and descriptive message
git commit -m "feat: Describe your new feature or fix"
```

#### 6. Push Your Branch to Your Fork
Push your new branch and its commits to your fork on GitHub (`origin`).

```bash
git push -u origin your-new-feature-branch
```

#### 7. Open a Pull Request (PR)
Propose your changes to the main project.

-   Go to your fork on GitHub.
-   Click the "Compare & pull request" button for your new branch.
-   **Important:** Ensure the base repository is `sivakumar232/timetable-frontend` and the base branch is `develop`.
-   Add a clear title and a detailed description of the changes you've made.
-   Click **Create pull request**.

Your pull request will be reviewed by the maintainers, who will provide feedback or merge your changes. Thank you for your contribution!
