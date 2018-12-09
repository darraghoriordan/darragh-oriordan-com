---
title: Setting up a macbook for a windows developer
subTitle: My notes
category: 'development'
cover: header.jpg
date: '2018-03-25T17:12:33'
---

I recently got a macbook at work and I'm doing only web development these days so no Visual Studio. I had to do a bit of reading to get things set up and I don't want to do it again so here is a post for me!

First thing is download iTerm from: https://www.iterm2.com/

Open a new iTerm and run the following to install Homebrew (this is like chocolatey)

```shell
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

next install oh my zsh

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Follow this great tutorial on setting up powershopp fonts and zsh: https://github.com/thacherT1D/fishToZsh

Setup git with homebrew

```shell
brew update && brew upgrade

brew install git

brew link --force git
```

Install beyond compare from https://www.scootersoftware.com/
Open beyond compare and go to File >> Installl command line tools
Confirm that "bcompare" can be launched from Terminal.

Run the fllowing lines to set up some git diff and merge magic and to add an alias to for code review (change develop here to whatever you use as your master branch)

Then in an iterm window enter:

```shell
git config --global alias.code-review = "!git difftool --dir-diff origin/develop...$1"
git config --global diff.tool bc3
git config --global difftool.bc3.trustExitCode true
git config --global merge.tool bc3
git config --global mergetool.bc3.trustExitCode true
```

Run a code review on some branch with differences and open the rules by clicking the rules button in the merge window o beyond compare. In here set beyond compare to follow symlinks! This will make all the paths line up like they should.

To launch a 3-way merge using Beyond Compare, use the command "git mergetool file.ext".
To launch a diff using Beyond Compare, use the command "git difftool --dir-diff".

If you're on a mac and you're using Rider from jetbrains but the rest of your team is using visual studio you can have repository specifc ignores by editing the .git/info/exclude file. The following will hide the idea folder.

```shell
.idea
```

Set iterm to use your project directory as the start up location in the preferences for iterm

If you use jira i highly recommend the zsh plugin "jira". To have this remember your jira instance add the following to ~/.zshrc

```shell
export JIRA_URL=https://jira.myorganisation.com
export JIRA_NAME=doriordan
export JIRA_PREFIX=REC-
export JIRA_RAPID_BOARD=true
```

then you can use

```shell
jira            # performs the default action
jira new        # opens a new issue
jira dashboard  # opens your JIRA dashboard
jira reported [username]  # queries for issues reported by a user
jira assigned [username]  # queries for issues assigned to a user
jira branch     # opens an existing issue matching the current branch name
jira ABC-123    # opens an existing issue
jira ABC-123 m  # opens an existing issue for adding a comment
```

Sweet, all done. This could be a great scripting project :D

Next install the following apps
https://www.cockos.com/licecap/ - Licecap for gif recording
https://www.spectacleapp.com/ - window management for osx
https://www.alfredapp.com/ - an enhanced spotlight/helper

You can use http://www.rubicode.com/Software/RCDefaultApp/ to change the default applications on the mac. For example the mail client can be changed from Mail without having to setup an email account in Mail.

Photo by Fabian Grohs on Unsplash
