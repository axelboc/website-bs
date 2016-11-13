# Benighted Soul

Website of **Benighted Soul**, the French symphonic, progressive metal band. The site is **responsive** and **accessible** (WCAG 2.0 level AA).

**https://benightedsoul.com**


## Performance

[GTmetrix](http://gtmetrix.com/) report of 13 November 2016:

**Homepage** (with Spotify player):

- Page Speed grade: **A** (95%)
- YSlow grade: **B** (84%)
- Page load time: **5.6s**

Note that the Spotify player is the only performance drain. The YouTube embeds are loaded on demand, and the rest of the page (including the Facebook feed) is entirely static.

**Band** page (no third-party widget):

- Page Speed grade: **A** (99%)
- YSlow grade: **B** (88%)
- Page load time: **1.5s**


## Tech stack

- pug/jade, PostCSS, browserify 
- **Roots**, static site generator - http://roots.cx/
- **Contentful**, cloud-based content management system - https://www.contentful.com/
- **Netlify**, static hosting - http://netlify.com/

The site is entirely static. Most of its content is stored and edited on Contentful, then retrieved at built time by Roots thanks to the [`roots-contentful` extension](https://github.com/carrot/roots-contentful). The site's content that is not meant to change often (e.g. page titles, meta descriptions, etc.) is stored in YAML files in the `data` folder.

Netlify's GitHub integration takes care of continuous deployment and sets up staging environments for branches and PRs. Every content change in Contentful triggers a rebuild and deploy of the site in Netlify.

### Internationalisation

The site is available in two languages: English and French. The `views/pages` folder contains one template partial for every page of the site. These page partials are language agnostic: the same partial is included from the page's templates in the `en` and `fr` folders. They are prefixed with `_` so as to not be compiled into pages themselves. This structure ensures that the markup and template logic is not duplicated.

The layout detects the language code of the template being compiled (`en` or `fr`) from its path. The translations are then retrieved from the site's content thanks to the following conventions:
- In YAML, the translations are simply nested under their language code.
- In Contentful, each internationalised piece of content is represented with one field per language. The fields are named in this precise format: `<code><FieldName>`. For instance, the title of an album is represented with two fields named `enTitle` and `frTitle`; it can therefore be retrieved as follows: `album[lang + 'Title']`.

### Facebook posts 

The news widget on the homepage displays the most recent posts from the band's [Facebook page](https://www.facebook.com/benightedsoul/). These posts are retrieved at compile time from the Facebook Graph API with the help of the [`roots-records` extension](https://github.com/carrot/roots-records). The posts are then filtered, passed to the templating context and compiled into static HTML. The final piece of the puzzle combines a Netlify webhook with an [IFTTT](http://ifttt.com/) recipe to automatically rebuild and deploy the site whenever a new post is created on the Facebook page. 
