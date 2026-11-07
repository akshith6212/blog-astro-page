---
title: "First steps after installing popos"
pubDatetime: 2021-10-13T00:00:00+05:30
description: "When you click the above link you find the warning to install gnome browser extension. Click on “click here to install browser extension” link to add the extens"
tags: ["Popos", "Linux"]
---
# 1. Update
Not only pop os but for any linux distribution, first thing to do is to update the system. By doing an update your system can get the update and will be latest, doing so you won’t be facing any issues.

```bash
sudo apt update
sudo apt upgrade
```

# 2. Install Gnome-Tweak tools
By default the minimize and maximize buttons won’t be available for pop os, we get those buttons by using gnome-tweak tools.

```bash
sudo apt install gnome-tweaks
```
After installing activate the maximize and minimize buttons as shown below.
![1](../assets/images/pop-1.png)

# 3. Install dash to dock
By default dock of pop os won’t be visible until you go into menu, so in order to get dock visible to us when hover to left of the screen we need to install “dash to dock extension”. Install it by clicking [here](https://extensions.gnome.org/extension/307/dash-to-dock/).

When you click the above link you find the warning to install gnome browser extension. Click on “click here to install browser extension” link to add the extension which will enable us to install the dash to dock gnome extension.

![2](../assets/images/pop-2.png)

After installing the extension refresh the page to get the option to install the dash to dock extension as shown below.

![3](../assets/images/pop-3.png)

After installing boom! the dock is placed properly. You can also make the size of dock to fit to entire column by ticking the box for “Panel mode: extend to the screen edge”. For this go to **extensions > dash to dock**.

# 4. Install media formats
After installing pop os provide the open formats but, it won’t provide codecs for popular formats like MP3 etc.. Install them by running following command.
```bash
sudo apt-get install ubuntu-restricted-extras
```
While running below command there will be a agreement you need to accept. Accept it and enjoy!.

# 5. Window Tiles issue
For some apps like Telegram-Desktop you may not see the close button bar at all. Then in that case , you can to **extension > pop shell > enable show window tiles**.

![4](../assets/images/pop-4.png)

<center><img src="../assets/images/pop-5.png" alt="5"></center>

Boom restart the application and they appear.

# 6. Bluetooth Issue
Don’t know why but some times you may not be able to turn on bluetooth i.e, the button for enabling bluetooth is visible in the settings but, it won’t effect if you turn it on. This issue has happened to me so in this scenario you can do a restart of bluetooth module by following commands.
```bash
sudo rmmod btusb
sudo modprobe btusb
```
<center><b>Atlast Welcome to pop os!!! You are ready to rock !!.</b></center>

>Note:
>
>For me, initially pop os was hanging for some reason, microphone not working. I still tried to wait for some time and I don’t know but everything fixed itself. Now, I am rocking on!!.
