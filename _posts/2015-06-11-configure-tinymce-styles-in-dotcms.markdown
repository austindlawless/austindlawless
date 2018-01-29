---
layout: post
title:  Configure TinyMCE Styles in DotCMS
date:   2015-06-11
description: An explanation of how to configure the TinyMCE WYSIWYG editor in DotCMS.
img: tiny-mce.png
tags: [Education, DotCMS, TinyMCE, Technology]
author: Austin Lawless
---

It is common practice to use CSS classes to format content. With some configuration, the TinyMCE WYSIWYG editor can empower non-code level users to keep with this practice. The styles-dropdown (pictured below) can be populated with a list of classes that can be applied to text in the editor using a span.

![TinyMCE WYSIWYG Menu Bar](/assets/img/tinymce-menu.png) 

By default the TinyMCE WYSIWYG editor in dotCMS includes the styles-dropdown but it is empty. In order to configure TinyMCE beyond the default install for dotCMS, the plugin needs to be installed to our static-plugin directory. Directions form dotCMS to do that are available [here](http://dotcms.com/docs/latest/controlling-tinymce-wysiwyg){:target="_blank"}

With that out of the way, let's get to configuring some styles!

We will be modifying two of the files from the TinyMCE plugin: `tiny_mce_config.jsp` and `plugin.properties`.

## Updates to 'tiny_mce_config.jsp':

There is a section of code as follows:

```
<% /*Set the WYSIWYG BLOCK FORMATS*/
  String blockformats =APILocator.getPluginAPI().loadProperty("org.dotcms.tinymce_extended", "WYSIWYG_BLOCKFORMATS");
  if(UtilMethods.isSet(blockformats)){
  %>
  <%="theme_advanced_blockformats : ""+blockformats+"","%>
  <%
  }else{
  %>
  <%="theme_advanced_blockformats : "p,div,h1,h2,h3,h4,h5,h6,blockquote,dt,dd,code,samp,pre","%>
  <%
  }
%>
```

We are going to use this code as a model for how our styles-dropdown will be populated. Replace the 'blockformats' references with 'styles' and update the default string with a list of classes like:


`"content,nav,footer,subHeader",` 

Or for a prettier list in the dropdown:

`"Content=content;Nav=nav;Footer=footer;Sub Header=subHeader",`

Even an empty list is fine because the property in the next file will override whatever we put as the default. The final product should look something like this:

```
<% /*Set the WYSIWYG STYLES*/
  String styles =APILocator.getPluginAPI().loadProperty("org.dotcms.tinymce_extended", "WYSIWYG_STYLES");
  if(UtilMethods.isSet(styles)){
  %>
  <%="theme_advanced_styles : ""+styles+"\","%>
  <%
  }else{
  %>
  <%="theme_advanced_styles : "\","%>
  <%
  }
%>
```

Now we need to update the 'plugin.properties' file to include our custom styles.


## Updates to 'plugin.properties':

We will again use the 'blockformats' configuration as a guide. It looks like this:

```
#specify the theme blockformats the wysiwyg should use
#if is not set by default use this blocksformats: "p,div,h1,h2,h3,h4,h5,h6,blockquote,dt,dd,code,samp,pre" 
WYSIWYG_BLOCKFORMATS=p,div,h1,h2,h3,h4,h5,h6,blockquote,dt,dd,code,samp,pre
```

The resulting 'styles' section looks like this:

```
#specify the theme styles the wysiwyg should use
#if is not set the default is: ""
WYSIWYG_STYLES=Content=content;Nav=nav;Footer=footer;Sub Header=subHeader
```

Now when we restart the server, the TinyMCE WYSIWYG editor will have a populated styles-dropdown that will apply `<span class="style" >...<\span>` to our content that can be formatted using our normal CSS file for our site.
