// Pint-Sized Power — tiny bit of front-end JS, no build step, no backend.

document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mark the current page in the nav
  var here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // Contact form -> opens the visitor's email client with everything filled in.
  // No server, no third-party form service — fits the £10 budget.
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var reason = form.reason ? form.reason.value : '';
      var message = form.message.value.trim();

      var subject = encodeURIComponent('Pint-Sized Power enquiry — ' + name);
      var bodyLines = [
        'Name: ' + name,
        'Email: ' + email,
        reason ? 'Reason: ' + reason : null,
        '',
        message
      ].filter(Boolean);
      var body = encodeURIComponent(bodyLines.join('\n'));

      var mailto = form.getAttribute('data-mailto') || 'hello@pintsizedpower.example';
      window.location.href = 'mailto:' + mailto + '?subject=' + subject + '&body=' + body;

      var status = document.getElementById('form-status');
      if (status) {
        status.textContent = 'Opening your email app now — send it across and we’ll get back to you!';
      }
    });
  }
});
