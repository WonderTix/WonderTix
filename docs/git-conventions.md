Note: If there are any questions/requests about any of the conventions regarding Wondertix, feel free to reach out to Ben Williams, Henry Kaus, or Ben Austin via the birvin slack or email.

### Textual Conventions

#### Branch Name

For new branches, each branch will be named after the ticket ID. This can be gathered from GitHub Issues, Jira, or Azure DevOps (depending on the source of the ticket).
Example: WT-14

#### Commit Messages

When committing, the commit message should start with the ticket ID (which would also be the branch name) followed by a detailed description of the commit.

It is a good idea to commit after substantial work has been completed. This doesn’t mean that each pull request is one commit, nor does it mean that each pull request is 20-30 commits, but somewhere in-between (1-10 commits is probably ideal). This is more of a subjective thing, but you should commit after a milestone has been met, such as getting a part of the ticket to work, removing a substantial piece of legacy code, completing the ticket, etc.
Example: WT-16: added price to event schema

#### Pull Request Title

When creating a PR, the title should begin with the ticket ID followed by a short title describing the contents of the PR (typically this can just be taken from the Jira ticket title)
Example: [WT-11] Incompatibility with Firefox fix

#### Pull Request Contents

When creating a PR, the PR will automatically have the following template to fill out:

```
Description
*Brief description of changes*

Risks
*Potential areas of concern that you would like looked at more closely*

Validation
*How you verified that these changes work*

Issue
*Link to corresponding issue*

Operating System
*If you're on Mac, please include whether you are on an Intel or M-series CPU*
```

In addition to describing the changes, if there is a visual component to the PR (such as a front-end component or fix), please include a before and after screenshot of the changes in the Description section to better illustrate what the PR accomplishes.

### Actionable Conventions

#### Typical Pull Request Review

At least one person from the team associated with the Pull Request, besides the one who created the pull request, should review the code.
In reviewing others’ code, ensure that you carefully review every file and every line changed. Look for problems, improvements, or alternatives that could improve the quality of the changes.

Additionally, all PRs require at least one approval from a project admin.

#### Typical Pull Request Merge

Once a PR has been approved, only the individual who created the PR should do the final merge (i.e. click “Squash and merge”).

