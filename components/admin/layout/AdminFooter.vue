<template>
  <div class="admin-footer">
    <div class="container text-center">
      <p>
        KHMER.BIZ |
        <a href="/images/guideline.pdf" target="_blank">
          <i class="fa fa-book-open-reader fa-lg"></i> User Guide
        </a> |
        <a href="https://t.me/cambodiawebhosting" target="_blank">
          <i class="fa-brands fa-telegram fa-lg"></i> cambodiawebhosting
        </a> |
        <a href="https://www.youtube.com/watch?v=01OhUFUhQM8&list=PLFNGjBqsHQG0odXrXZeBUEaqJghiocvyX&index=6"
          target="_blank">
          <i class="fa-brands fa-youtube text-danger fa-lg"></i> Cambodia Web Hosting
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.admin-footer {
  position: inherit;
  bottom: 0;
  overflow: scroll;
  background-color: white;
  padding: 5px;
  z-index: 12;
  font-weight: bold;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  width: 100%;
}

.admin-footer p {
  margin: 0;
  font-size: 14px;
}

.admin-footer a {
  color: #337ab7;
  text-decoration: none;
}

.admin-footer a:hover {
  text-decoration: underline;
}

.text-danger {
  color: #d9534f;
}
</style>
