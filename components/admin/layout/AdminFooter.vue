<template>
  <div class="admin-footer">
    <div class="container">
      <p>
        KHMER.BIZ |
        <a href="/docs/USER_GUIDE.html" target="_blank">
          <i class="fa fa-book-open-reader fa-lg"></i> User Guide
        </a> |
        <a href="https://t.me/cambodiawebhosting" target="_blank">
          <i class="fa-brands fa-telegram fa-lg"></i> cambodiawebhosting
        </a> |
        <a href="https://www.youtube.com/@cambodiawebhosting" target="_blank">
          <i class="fa-brands fa-youtube text-danger fa-lg"></i> Cambodia Web Hosting
        </a>
      </p>
    </div>
  </div>
</template>

<style scoped>
.admin-footer {
  position: inherit;
  display: flex;
  bottom: 0;
  background-color: transparent;
  padding: 5px;
  z-index: 12;
  font-weight: bold;
  margin-top: 20px;
  text-align: center;
  align-items: center;
  justify-content: center;

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
