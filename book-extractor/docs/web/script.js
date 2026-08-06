document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-links button');
  const sections = document.querySelectorAll('.content-section');

  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      navButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');

      // Get target section id
      const targetId = button.getAttribute('data-target');

      // Hide all sections
      sections.forEach(section => {
        section.classList.remove('active');
      });

      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top of main content
        document.querySelector('.main-content').scrollTop = 0;
      }
    });
  });
});
