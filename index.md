---
layout: page
title: "Home"
class: home
---

# Hi, I'm Sam Wong 👋🏻

<div class="columns" markdown="1">

<div class="intro" markdown="1">
I'm a Research Assistant at the [Paul G. Allen School](https://www.cs.washington.edu/) at [University of Washington](https://www.washington.edu/), where I am working with [Amy Zhang](https://homes.cs.washington.edu/~axz/) at the [Social Futures Lab](https://social.cs.washington.edu/index.html). My research is in Human Computer Interaction and Social Computing, specifically in building systems that facilitates understanding and participation in an online social setting. I am collabroating with [Ruotong Wang](https://homes.cs.washington.edu/~ruotongw/).

I recently graduated from my Masters degree at [Global Innovation Exchange](https://gix.uw.edu/) from the [University of Washington](https://www.washington.edu/), where I worked with [Jerry Cao](https://jerrycao22.github.io/) from [Ubicomp Lab](https://ubicomplab.cs.washington.edu/) in designing accessible eyedroppers for people with disability. I received my Bachelors degree in [Cognitive Science](https://cogsci.ucsd.edu/) and a minor in [Computer Science](https://cse.ucsd.edu/) from [UC San Diego](https://ucsd.edu/). Previously, I have worked with [Yan Chen](https://chensivan.github.io/) from [Virginia Tech](https://vt.edu/) on building learning analytics tools. 


Find me on [GitHub](https://github.com/domoritz), [Bluesky](https://bsky.app/profile/domoritz.de), [LinkedIn](https://www.linkedin.com/in/dominik-moritz-409b8124/), [Twitter](https://twitter.com/domoritz) or [Google Scholar](https://scholar.google.com/citations?user=3ikhPPUAAAAJ&hl=en). You can also check out my [CV](https://docs.google.com/document/d/1-isyXIbIYdkAbXpjAtFqDBIJGTswV75oZ_GFzHkoXr8/edit?usp=sharing).
</div>

<div class="me" markdown="1">
<picture>
  <source srcset='/images/sam_wong.webp' type='image/webp' />
  <img
    src='/images/sam_wong.jpg'
    alt='Sam Wong'
   >
</picture>

{:.no-list}
* <a href="mailto:{{ site.email }}">{{ site.email }}</a>
</div>

</div>


## Featured <a href="{{ "/projects/" | relative_url }}">Projects</a>

<div class="featured-projects">
  {% assign sorted_projects = site.data.projects | sort: 'highlight' %}
  {% for project in sorted_projects %}
    {% if project.highlight %}
      {% include project.html project=project %}
    {% endif %}
  {% endfor %}
</div>

<a href="{{ "/projects/" | relative_url }}" class="button">
  <i class="fas fa-chevron-circle-right"></i>
  Show More Projects
</a>

## Featured <a href="{{ "/publications/" | relative_url }}">Publications</a>

<div class="featured-publications">
  {% assign sorted_publications = site.publications | sort: 'year' | reverse %}
  {% for pub in sorted_publications %}
    {% if pub.highlight %}
      <a href="{{ pub.pdf }}" class="publication">
        <strong>{{ pub.title }}</strong>
        <span class="authors">
          {% for author in pub.authors %}
            {% if author == "Sam Wong" %}
              <strong>{{ author }}</strong>
            {% else %}
              {{ author }}
            {% endif %}
            {% unless forloop.last %}, {% endunless %}
          {% endfor %}
        </span>.
        <i>{% if pub.venue %}{{ pub.venue }}, {% endif %}{{ pub.year }}</i>.
        {% for award in pub.awards %}<br/><span class="award"><i class="fas fa-{% if award == "Best Paper Award" %}trophy{% else %}award{% endif %}" aria-hidden="true"></i> {{ award }}</span>{% endfor %}
      </a>
    {% endif %}
  {% endfor %}
</div>

<a href="{{ "/publications/" | relative_url }}" class="button">
  <i class="fas fa-chevron-circle-right"></i>
  Show All Publications
</a>
