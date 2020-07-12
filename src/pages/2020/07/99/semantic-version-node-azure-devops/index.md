---
title: 'Sermantic versioning a node app on Azure DevOps CI'
category: 'development'
cover: header.jpg
date: '2020-10-04T17:12:33'
---

Using semantic versioning automates the version process and by using a convention you can remove any arguments about versioning in your team. I specifically set up Azure DevOps here but this would work on any CI system.

<!-- end excerpt -->

## Versioning and SemVer

If you deploy an application it's really useful to automatically increment a version so you know what code is running on a given environment. A really common version system is "semver" or semantic versioning. Semvers are used all over the javascript ecosystem. They are also widely used on other ecosystems.

A semver looks like `2.45.1` where the parts are `[major].[minor].[patch]`. The major version gets updated when there is a breaking change. The minor version gets updated when there is a new feature and the patch version gets updated when there is a bugfix or similar.

Package system can use this format to decide what version to upgrade automatically. It is assumed that major versions will break things so that needs a manually upgrade. But minor and patch versions can be updated safely.

## Conventional commits

if we want to automate setting the versionm, we need to be able to automatically detect the type of change in a commit. This is where conventional commits come in. This is a standard way of setting a commit message so that tools can read your commit messages and decide if you have added a `major` change, a `minor` change or a `patch`.

The way these are formatted is using a prefix. There are some well known prefixes that are understood by tools. `feat`, `fix`, `docs`, `chore` are usually understood. And your libraries will list the ones it understands. I find it easier to use only 3-4 in my day to day work though.

Example commit messages: `feat: added the new menu item` or `fix: There was a typo on the menu button`.

In those cases the commits would be parsed as feat - minor version bump and fix - patch version bump. If we know that we are introducing a breaking change we can add a bang to the prefix. So `feat!: Change session cookie name` would indicate that that this is a breaking change and would bump the major version.

## The pattern we will use

1. We make a change to the code. It goes in to PR and gets merged to master with a conventional commit message.
2. Our CI system picks up the change and builds it
3. The build works so we set the version in package.json based on the previous version and the commit message
4. We also tag git with the new version

## Enforcing conventional commits

To enforce commit format we will use a few libraries. Husky in particular is great for running checks each time we work with git. Install these with

`yarn add -D husky @commitlint/cli @commitlint/config-conventional`

husky lets us add hooks when we work with git. Commitlint checks the commit message.

We need to configure the libraries. In your projects package.json file you can add

```json
{
  "commitlint": {
    "extends": ["./node_modules/@commitlint/config-conventional"],
    "rules": {
      "subject-case": [0],
      "header-max-length": [0, "always", 120]
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

This tells commit lint to use the conventional commit rule set as a base. And then tells husky to use commit lint whenever we submit a commit.

There are many settings available. Check out the commitlint cli documentation. Here I turn off any subject case requirements. By default it requires lowercase for everything but I sometimes use pascal case to start sentences out of habit. I also set the header length to be a bit longer than the default.

`-E HUSKY_GIT_PARAMS` - husky puts all the variables that we passed to git in the variable `HUSKY_GIT_PARAMS` so that tools like commit lint can see and use them.

What will happen here is that every time a commit is attempted, it will get linted based on the conventional commit message rules. The developer will get an error if they deviate. This is painful to start with but it becomes second nature after a while!

## Bumping versions based on commit message

When your CI tool builds a new change you can have it set the version before you package the code artifacts. For this we use a package called `semantic-version` in our CI step.

This setup means installing the following libraries

`yarn add -D @semantic-release/changelog @semantic-release/exec`

Then we add the following to our package.json file. We add a script that calls semantic-release.

We configure the release process. There is more detail on the semantic-release documentation but briefly,

1. we check for any existing tag on our repository for the current version
2. we parse the commit message for the next version
3. we bump the package.json version to the new version
4. we create a changelog
5. we push the changelog to git in a release
6. we tag git with the latest version

```json
{
  "scripts": { "release": "npx semantic-release" },
  "release": {
    "plugins": [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      [
        "@semantic-release/npm",
        {
          "npmPublish": false
        }
      ],
      [
        "@semantic-release/changelog",
        {
          "changelogFile": "docs/CHANGELOG.md"
        }
      ],
      [
        "@semantic-release/github",
        {
          "assets": ["docs/CHANGELOG.md"]
        }
      ]
    ]
  }
}
```

## Calling this on your CI system

After we have successfully built the change and tested it, basically when we know we have a valid version, we can bump the code version.

We run the release command we just configured. This will do the steps described above.

In the second command in this script we copy the version from the package.json file and put it in our front end project as a simple txt file.

This step has a condition that only runs for commits to master. We don't want to version feature branches.

```yaml
- script: |
    npm run release
    node -e 'console.log(require("./myProject/package.json").version)' | tee myFrontEndProject/build/static/version.txt
  condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/master'))
  displayName: 'Bump release version'
```

Note: We don't push the updated package.json to git on CI because it would cause another commit. So the version is only on the git tag. If we want to have the version anywhere else on CI we have to manually set it.
