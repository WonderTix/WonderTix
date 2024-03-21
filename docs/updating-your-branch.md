# Updating Your Branch
Compiled by Jaeger Tang. Last updated Oct 3, 2023.

### Introduction
When working on a collaborative project using Git, it's common for the main codebase (often referred to as the `main` or `master` branch) to receive updates as other contributors merge their changes. If you're working on a feature or bugfix branch, it's essential to periodically integrate these updates into your branch. This ensures that your changes are compatible with the latest state of the project and helps prevent merge conflicts when it's time to integrate your work into the main codebase.

Tip: Start your coding day by syncing your branch with the updated `main`. Whether you choose to rebase or merge, this habit ensures you're building on the latest changes and minimizes potential conflicts down the road.


There are two primary methods to integrate updates from the `main` branch into your feature branch: rebase and merge. Both methods have their advantages and use cases. This guide will walk you through each method, helping you choose the right approach for your situation and guiding you through the steps.

### Rebase vs. Merge

- Rebase: This moves the entire history of the branch you're rebasing onto the tip of the `main` branch. It's as if the changes on your branch were made on top of the latest commits in `main`.

- Merge: This takes the changes from one branch and applies them onto another. This is a non-destructive operation and ensures that the branch's history remains intact.

For a deeper understanding of rebase vs. merge, consider exploring YouTube. Numerous informative videos use animations to vividly illustrate these concepts.
Preparing for Rebase or Merge 

1. First, ensure your local `main` branch is up-to-date with the remote:
```
   git checkout main
   git pull
```
   
It is important to first synchronize your local main branch. Once that foundational step is completed, you're set to proceed with either Rebase or Merge, as detailed below.

### Rebase Guide

1. Switch to the branch you want to rebase, e.g., `DEP-31-mock-auth0`:

`
   git checkout DEP-31-mock-auth0
`

1. Start the rebase process:

`
   git rebase main
`
 
1. If there are any merge conflicts, resolve them. Once resolved, continue the rebase:

`
   git rebase --continue
`

2. Once the rebase is complete, you'll need to push your changes. Since the history of your branch has changed due to the rebase, a regular push won't work. You can use the `--force-with-lease` option to safely force push:

`
   git push --force-with-lease
`


Note: The --force-with-lease option is a safer alternative to the regular --force option. It ensures that you don't accidentally overwrite someone else's work. If someone else has pushed changes to the same branch after you fetched it, --force-with-lease will prevent the push and alert you. It's like saying, "I want to force push, but only if no one else has pushed in the meantime." However, if you are sure you are the only person using the branch, you can just use: 

`
   git push -f    # same as git push —-force
`

### Merge Guide

1. Switch to the branch you want to merge changes into, e.g., `DEP-31-mock-auth0`:

`
   git checkout DEP-31-mock-auth0
`
   
2. Merge the `main` branch into your branch:

`
   git merge main 
`

1. Handle Non-Fast-Forward Merges: If you encounter a message indicating a non-fast-forward merge (i.e., branches have diverged), you have two main options:

Merge Commit: Continue merging buy creating a merge commit to maintain the history of both branches:

`
git merge --no-ff main
`

Switch to Rebase (Refer to rebase guide): Alternatively, you can rebase your branch onto main. This will move your branch's commits to the tip of main, creating a linear history. Use this with caution if your branch is shared with others, as it rewrites commit history:

`
git rebase main
`

5. If there are any merge conflicts, resolve them. Once resolved, commit the changes.

6. Push the merged changes:

`
   git push
`

### Handling Merge Conflicts

Encountering merge conflicts is common when multiple people work on the same codebase. If you come across merge conflicts and are unsure about resolving them, don't hesitate to reach out. Pair with a team lead or a teammate for assistance. Two pairs of eyes are better than one!


#### Aborting a Rebase or Merge Process

If you're in the middle of resolving conflicts during a rebase or merge and feel that something went wrong or you're unsure about the changes, it's essential to know how to safely abort the process. Here's how you can do it:

##### 1. Aborting a Rebase:

If you're in the midst of a rebase and wish to cancel it, use the following command:

`
git rebase --abort
`

This command will stop the rebase process and revert your branch to the state it was in before you started the rebase.

##### 2. Aborting a Merge:

If you're in the middle of a merge and want to cancel it, use the following command:
git merge --abort


This command will stop the merge process and revert your branch to the state it was in before you initiated the merge.


After aborting a rebase or merge, always double-check your branch's state using `git log` or `git status` to ensure everything is as expected. If you're ever unsure or feel overwhelmed by conflicts, don't hesitate to seek assistance from a team lead or a more experienced teammate.


#### Rebase vs. Merge: Advantages and Use Cases
##### Rebase
Advantages:
1. Linear History: Rebasing creates a linear commit history, which can make it easier to understand the sequence of changes when looking at the commit log.
2. Cleaner History: By moving the entire branch to the tip of the `main` branch, it appears as if the changes were made in a sequential manner, eliminating the interleaved commits that can occur with merges.
3. Avoids Merge Commits: Rebasing avoids the creation of additional merge commits, leading to a tidier commit history.

Use Cases:
1. Feature Development: If you're working on a feature or bugfix and want to integrate the latest changes from `main` without creating a merge commit, rebasing is a good choice.
2. Open Source Contributions: Many open source projects prefer rebasing over merging to maintain a clean commit history.
3. Before Pull/Merge Requests: Rebasing your branch before submitting a pull or merge request can make the integration process smoother for the maintainers.

##### Merge
Advantages:
1. Preserves History: Merging keeps the branch history intact, preserving the context in which changes were made.
2. Non-destructive: Merging is a non-destructive operation, ensuring that the commit history of your branch remains unchanged.
3. Clear Record of Integration: Merge commits provide a clear record of when and how changes from one branch were integrated into another.

Use Cases:
1. Collaborative Branches: If multiple developers are working on a shared branch, merging is often preferred to keep the history of collaborative efforts intact.
2. Release Branches: When merging feature branches into a release or staging branch, merge commits provide a clear record of which features were added when.
3. Historical Context: If you want to preserve the exact state and context of your branch at the time of integration, merging is the way to go.
