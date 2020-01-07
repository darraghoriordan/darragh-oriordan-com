---
title: How I enhance pull request quality on GitHub and Azure DevOps
category: 'development'
cover: header.jpg
date: '2019-12-29T17:12:33'
---

Code reviews and PRs are deservedly known as a fantastic way to improve code and product quality.

I find that having a checklist is super handy for remembering all the checks to perform and the context to give a reviewer.

<!-- end excerpt -->

## Adding a template to your platform

On some repository and CI platforms you can automatically populate the description field of a PR with content to remind yourself what to consider for each review.

You'll need to check your the instructions for your specific platform but in general it means adding an `.md` file to a specific directory. For example:

| Platform     | Location                                        |
| ------------ | ----------------------------------------------- |
| GitHub       | docs/pull_request_template.md                   |
| Azure DevOps | /docs/pull_request_template/my_template_name.md |

## My pull request template in markdown format

Here's the checklist I use. Is there anything you would add or remove??

```md
# Summary

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] This change has database scripts

_Describe the specific issue this is fixing, just a summary will do if there is a link back to the work item that this change adresses._

# What has changed

_Summarize the change made e.g. Small change - added new UI element, wired it up to existing data model._

## In scope areas

_Specify the specific areas of code or modules that have been affected by this change. e.g. frontend only, backend only or ticketing module and authentication module._

## Out of scope areas

_List any areas that could usually be assumed to have been changed but are not in this case. The point is to save the reviewer and tester time._

# Risk

_Describe the risks that apply to your application. This will be very specific to your business but some of the common risks are_

- [ ] Does not use our gradual release process
- [ ] Handles PII that needs to be compliant with GDPR requirements
- [ ] Adds new libraries
- [ ] Third-party apis (dependancy must be resiliant)
- [ ] Requires specific access control (e.g. admin only functionality)
- [ ] Handles money amounts
- [ ] Has specific OWASP security concerns([https://nodegoat.herokuapp.com/tutorial](https://nodegoat.herokuapp.com/tutorial))

# Author pre-publish checklist:

- [ ] Has relevant logging
- [ ] Meets our coding standards (link*to_your_coding_standards) - \_Prefer auto-linting for this if possible*
- [ ] I have performed a self-review of my own code (link_to_standards)
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass with my changes
- [ ] There are no obvious injection issues
- [ ] User input is validated
- [ ] No PII is stored to logs
- [ ] My changes generate no new warnings
- [ ] I have sat with a tester to demo and discuss the change
- [ ] Relevant authorization checks are implemented
- [ ] I have made corresponding changes to the documentation

# Developer testing performed

_Describe the testing you have performed as part of this change. Note it here for the reviewer and tester. Note if there is any data or scripts required to set the system up correctly to test your feature._

_Is there any testing that seems like it would be needed in this case but maybe isn't required? - note it here with reasoning for the reviewer and tester_

# Reviewer checklist

- [ ] All the risks above are not present or have been mitigated
```

## Conclusion

Using a template might seem like too much bureaucracy but it is really helpful when you have some place to add issues that regularly show up in pull requests. This helps the author fix them before wasting anyone's time.

The pull request template ensures that everyone has enough context to work with the new code before it is merged (e.g. testing).

The pull request template is incredibly useful for new team members to understand the level of quality required by your organisation and to show them what is currently important. e.g. if you are doing a gradual system wide refactor and don't want anyone to use the "old way" of doing something but there are still many example of the "old way" in your code base, the code review template can be used to show the new team member that they shouldn't use that technique anymore, even if they see it everywhere.

You can remove things from the pull request template when the is no longer relevant (and add them back again if the issue starts showing up too often). It is a living document that supports the developers on your team.

The code review template provides a nice list of the things that could be automated away in your org. You should be on the lookout for ways to add a CI step or a pre-commit hook to automate the check away. These make for great hackathon problems!
