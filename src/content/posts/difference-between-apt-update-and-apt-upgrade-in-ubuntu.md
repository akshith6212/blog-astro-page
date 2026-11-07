---
title: "Difference Between apt update & apt upgrade in Ubuntu"
pubDatetime: 2021-06-09T00:00:00+05:30
description: "In this blog I will try to explain difference between apt update and apt upgrade in ubuntu."
tags: ["Linux"]
ogImage: "@/assets/images/ubuntu-Package-Manager.png"
---

In this blog I will try to explain difference between apt update and apt upgrade in ubuntu.

<!-- ![apt](../assets/images/ubuntu-Package-Manager.png) -->

```bash
sudo apt update
```

By running above command the apt package manager will fetch the updates (if present) from the source.list file. This file contains all the package repository of packages which are installed. So by running the above command the **apt** package manager checks for the updates using this sources.list file.

This is How the content inside the sources.list file looks like.

```bash
sudo apt upgrade
```

While, this command actually updates the packages present in the source list i.e, install the available updates.
