// Mobile menu toggle
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// Load data from JSON files
async function loadData() {
    try {
        // Load skills
        const skillsResponse = await fetch('data/skills.json');
        const skills = await skillsResponse.json();
        renderSkills(skills);
    } catch (error) {
        console.error('Error loading skills:', error);
        renderDefaultSkills();
    }

    try {
        // Load projects
        const projectsResponse = await fetch('data/projects.json');
        const projects = await projectsResponse.json();
        renderProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
        renderDefaultProjects();
    }

    try {
        // Load certifications
        const certsResponse = await fetch('data/certifications.json');
        const certifications = await certsResponse.json();
        renderCertifications(certifications);
    } catch (error) {
        console.error('Error loading certifications:', error);
        renderDefaultCertifications();
    }

    try {
        // Load blog posts
        const blogResponse = await fetch('data/blog.json');
        const blogPosts = await blogResponse.json();
        if (blogPosts && blogPosts.length > 0) {
            renderBlog(blogPosts);
        } else {
            showBlogPlaceholder();
        }
    } catch (error) {
        console.error('Error loading blog:', error);
        showBlogPlaceholder();
    }
    // try {
    //     const response = await fetch(
    //         'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@tamandeepsinghkhamba'
    //     );

    //     if (!response.ok) {
    //         throw new Error('Failed to fetch Medium feed');
    //     }

    //     const data = await response.json();

    //     const blogPosts = data.items.map(item => ({
    //         title: item.title,
    //         date: item.pubDate,
    //         excerpt: item.description
    //             .replace(/<[^>]*>/g, '')   // remove HTML
    //             .slice(0, 180) + '...',
    //         link: item.link,
    //         tags: item.categories || []
    //     }));

    //     if (blogPosts.length > 0) {
    //         renderBlog(blogPosts);
    //     } else {
    //         showBlogPlaceholder();
    //     }

    // } catch (error) {
    //     console.error('Error loading Medium blog:', error);
    //     showBlogPlaceholder();
    // }
}

// Render Skills
function renderSkills(skills) {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = '';
    
    for (const [category, items] of Object.entries(skills)) {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        const title = document.createElement('h3');
        title.textContent = category;
        categoryDiv.appendChild(title);
        
        const tagsDiv = document.createElement('div');
        tagsDiv.className = 'skill-tags';
        
        items.forEach(skill => {
            const tag = document.createElement('span');
            tag.className = 'skill-tag';
            tag.textContent = skill;
            tagsDiv.appendChild(tag);
        });
        
        categoryDiv.appendChild(tagsDiv);
        container.appendChild(categoryDiv);
    }
}

function renderDefaultSkills() {
    const defaultSkills = {
        "Cloud & Infrastructure": ["AWS", "GCP", "Terraform", "Kubernetes", "Docker", "Ansible"],
        "CI/CD & GitOps": ["GitHub Actions", "GitLab CI/CD", "Jenkins", "ArgoCD"],
        "Observability": ["Elasticsearch", "Logstash", "Kibana", "Fluent Bit", "Grafana", "Prometheus"],
        "Security": ["IAM", "VPC", "Cloud NGFW", "Cloud Armor", "Wazuh SIEM", "Firewalls"],
        "Programming": ["Python", "Bash", "JavaScript", "PHP"]
    };
    renderSkills(defaultSkills);
}

// Render Projects
function renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        const title = document.createElement('h3');
        title.textContent = project.title;
        card.appendChild(title);
        
        const description = document.createElement('p');
        description.textContent = project.description;
        card.appendChild(description);
        
        if (project.technologies && project.technologies.length > 0) {
            const techDiv = document.createElement('div');
            techDiv.className = 'project-tech';
            
            project.technologies.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'tech-badge';
                badge.textContent = tech;
                techDiv.appendChild(badge);
            });
            
            card.appendChild(techDiv);
        }
        
        if (project.link) {
            const link = document.createElement('a');
            link.href = project.link;
            link.className = 'project-link';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.innerHTML = 'View Project →';
            card.appendChild(link);
        }
        
        container.appendChild(card);
    });
}

function renderDefaultProjects() {
    const defaultProjects = [
        {
            title: "Multi-Cloud Infrastructure Automation",
            description: "Terraform-based infrastructure as code solution for managing AWS and GCP resources with automated deployments.",
            technologies: ["Terraform", "AWS", "GCP", "GitHub Actions"],
            link: "https://github.com/TamandeepSingh"
        },
        {
            title: "Kubernetes Security Platform",
            description: "Comprehensive security implementation for Kubernetes clusters including RBAC, network policies, and security scanning.",
            technologies: ["Kubernetes", "Helm", "Falco", "Trivy"],
            link: "https://github.com/TamandeepSingh"
        },
        {
            title: "Centralized Logging Pipeline",
            description: "ELK stack implementation with custom log filtering, PII masking, and real-time alerting capabilities.",
            technologies: ["Elasticsearch", "Logstash", "Kibana", "Fluent Bit"],
            link: "https://github.com/TamandeepSingh"
        }
    ];
    renderProjects(defaultProjects);
}

// Render Certifications
function renderCertifications(certifications) {
    const container = document.getElementById('certificationsContainer');
    container.innerHTML = '';
    
    certifications.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card';
        
        if (cert.badge) {
            const badge = document.createElement('img');
            badge.src = cert.badge;
            badge.alt = cert.name;
            badge.className = 'cert-badge';
            card.appendChild(badge);
        } else if (cert.icon) {
            const icon = document.createElement('div');
            icon.className = 'cert-icon';
            icon.textContent = cert.icon;
            card.appendChild(icon);
        }
        
        const info = document.createElement('div');
        info.className = 'cert-info';
        
        const name = document.createElement('h3');
        name.textContent = cert.name;
        info.appendChild(name);
        
        const provider = document.createElement('p');
        provider.textContent = cert.provider;
        info.appendChild(provider);
        
        card.appendChild(info);
        container.appendChild(card);
    });
}

function renderDefaultCertifications() {
    const defaultCerts = [
        { name: 'GCP Professional Cloud Architect', provider: 'Google Cloud', icon: '☁️' },
        { name: 'GCP Associate Cloud Engineer', provider: 'Google Cloud', icon: '☁️' },
        { name: 'HashiCorp Terraform Associate', provider: 'HashiCorp', icon: '🔧' },
        { name: 'AWS Cloud Practitioner', provider: 'Amazon Web Services', icon: '☁️'}
    ];
    renderCertifications(defaultCerts);
}

// Render Blog
// function renderBlog(blogPosts) {
//     const container = document.getElementById('blogContainer');
//     container.innerHTML = '';
    
//     blogPosts.forEach(post => {
//         const card = document.createElement('div');
//         card.className = 'blog-card';
        
//         const date = document.createElement('div');
//         date.className = 'blog-date';
//         date.textContent = formatDate(post.date);
//         card.appendChild(date);
        
//         const title = document.createElement('h3');
//         title.textContent = post.title;
//         card.appendChild(title);
        
//         const excerpt = document.createElement('p');
//         excerpt.textContent = post.excerpt;
//         card.appendChild(excerpt);
        
//         if (post.tags && post.tags.length > 0) {
//             const tagsDiv = document.createElement('div');
//             tagsDiv.className = 'blog-tags';
            
//             post.tags.forEach(tag => {
//                 const tagSpan = document.createElement('span');
//                 tagSpan.className = 'blog-tag';
//                 tagSpan.textContent = tag;
//                 tagsDiv.appendChild(tagSpan);
//             });
            
//             card.appendChild(tagsDiv);
//         }
        
//         container.appendChild(card);
//     });
// }

function renderBlog(blogPosts) {
    const container = document.getElementById('blogContainer');
    container.innerHTML = '';
    
    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        const date = document.createElement('div');
        date.className = 'blog-date';
        date.textContent = formatDate(post.date);
        card.appendChild(date);
        
        const title = document.createElement('h3');
        title.textContent = post.title;
        card.appendChild(title);
        
        const excerpt = document.createElement('p');
        excerpt.textContent = post.excerpt;
        card.appendChild(excerpt);

        
        if (post.tags && post.tags.length > 0) {
            const tagsDiv = document.createElement('div');
            tagsDiv.className = 'blog-tags';
            
            post.tags.forEach(tag => {
                const tagSpan = document.createElement('span');
                tagSpan.className = 'blog-tag';
                tagSpan.textContent = tag;
                tagsDiv.appendChild(tagSpan);
            });
            
            card.appendChild(tagsDiv);
        }

        const readMore = document.createElement('a');
        readMore.href = post.link;
        readMore.target = '_blank';
        readMore.textContent = 'Read on Medium →';
        readMore.className = 'blog-read-more';

        card.appendChild(readMore);

        container.appendChild(card);
    });
}

function showBlogPlaceholder() {
    const container = document.getElementById('blogContainer');
    container.innerHTML = `
        <div class="blog-placeholder">
            <p>📝 Blog posts coming soon!</p>
            <p style="font-size: 0.875rem;">Edit <strong>data/blog.json</strong> to add your blog posts</p>
        </div>
    `;
}

// Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

// Smooth scroll to section
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlight on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});