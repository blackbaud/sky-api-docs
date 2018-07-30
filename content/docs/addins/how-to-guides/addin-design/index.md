---
layout: layout-sidebar
name: Add-in design
order: 10
published: true
showInNav: true
title: Add-in design
---
{{ include stache.config.partial_header_edit }}

# Design your add-in

SKY Add-ins extend the Blackbaud solution experience by providing contextual functionality that can be accessed within selected areas of the user interface. Add-ins provide a natural extension to the user experience and facilitate a deeper integration by empowering users to work seemlessly with  third-party features and content without having to context switch between applications.

Your add-in's UX design must integrate seamlessly with the Blackbaud user interface to provide an efficient, natural interaction model for your users.

### SKY Add-in design principles

Blackbaud applications follow a general set of interaction guidelines, with consistent presentation metaphors used across every aspect of the system.  This commonality is built on a set of principles designed to support end users' tasks.  Understanding and following these principles will help you create positive add-in experiences for users:

- **Design explicitly for SKY.** The functionality, look and feel of a SKY Add-in should harmoniously complement the rest of the Blackbaud user's  experience.  Add-ins should feel native and behave like other native features.  A well-designed add-in will be an appropriate blend of your experience, the Add-in framework, and the Blackbaud native application functionality.  While we do not require any particular client-side user interface framework, consider using <a href="https://developer.blackbaud.com/skyux">SKY UX</a> to achieve a consistent look and feel where appropriate.
For more information, view the <a href="https://developer.blackbaud.com/skyux/design">SKY UX design guidelines</a>.

- **Focus on a few key tasks; do them well.** Help users be productive by focusing on common use cases and workflows without being too general-purpose. Don't try to replicate your entire application's functionality within an add-in.  Instead, provide contextually relevant functionality, with links to your web site as appropriate.

- **Use branding appropriately**. Allow your content and functionality to be the focus of the experience, and brand your add-in wisely.  Strike a balance between providing users with a unique and recognizable experience from your system with the existing look and feel within the native Blackbaud system.  Avoid distracting users with unnecessary marketing material and instead keep the focus on content and task completion.

- **Design for broad access.** Like all Blackbaud solutions, add-ins are designed to work across platforms, across browsers, and even across devices.  Your add-in's user interface should be optimized for the specific extension point metaphor (tab, tile, etc.), with a responsive look and feel across form factors.