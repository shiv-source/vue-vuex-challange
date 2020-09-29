<template>
  <div class="container">
    <div class="mt-3">
      <h1 id="header">Latest Posts</h1>
      <div
        v-if="
          !(
            this.$store.state.isPostsLoaded &&
            this.$store.state.isPropertiesLoaded &&
            this.$store.state.isUsersLoaded
          )
        "
        class="text-center"
      >
        <div
          class="spinner-border text-primary"
          role="status"
          style="width: 5rem; height: 5rem"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else>
        <table class="table table-bordered table-dark table-hover">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Property</th>
              <th scope="col">User</th>
              <th scope="col">Network</th>
              <th scope="col">Date</th>
              <th scope="col">Image</th>
              <th scope="col">Content</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in getPost" :key="post.id">
              <td>{{ post.id }}</td>
              <td>
                {{
                  post.property_id !== "null"
                    ? getName(post.property_id)
                    : "Unknown"
                }}
              </td>
              <td>
                {{ getUserName(post.property_id) }}
                <img
                  class="postImg"
                  v-bind:src="getUserImage(post.property_id)"
                />
              </td>
              <td>
                <span
                  class="btn btn-social-icon"
                  v-bind:class="'btn-' + post.social_network"
                  ><i class="fa" v-bind:class="'fa-' + post.social_network"></i>
                </span>
              </td>
              <td>
                {{
                  post.post_date !== "null"
                    ? new Intl.DateTimeFormat("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }).format(new Date(Date.parse(post.post_date)))
                    : ""
                }}
              </td>
              <td><img class="postImg" v-bind:src="post.post_media" /></td>
              <td>
                {{ post.post_content !== "null" ? post.post_content : "" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  beforeCreate() {
    this.$store.dispatch("getPostsData");
    this.$store.dispatch("getProperties");
    this.$store.dispatch("getUser");
  },

  computed: {
    getPost() {
      return this.$store.state.posts;
    },

    getProperties() {
      return this.$store.state.properties;
    },

    getUser() {
      return this.$store.state.user;
    },
  },

  methods: {
    getName(property_id) {
      if (property_id !== null || "null" || undefined) {
        let name = this.$store.state.properties.filter(
          (property) => property.id === property_id
        )[0];
        if (name !== undefined) {
          return name.name;
        } else {
          return "Unknown";
        }
      }
    },

    getUserImage(userId) {
      if (userId !== null || "null" || undefined) {
        let users = this.$store.state.users.filter(
          (user) => user.id === userId
        )[0];
        if (users !== undefined) {
          return users.profile_picture;
        } else {
          return "Unknown";
        }
      }
    },

    getUserName(userId) {
      if (userId !== null || "null" || undefined) {
        let users = this.$store.state.users.filter(
          (user) => user.id === userId
        )[0];
        if (users !== undefined) {
          return users.name;
        } else {
          return "Unknown";
        }
      }
    },
  },
};
</script>

<style scoped>
.postImg {
  width: 100px;
  height: 50px;
}
th {
  text-align: center;
}

#header {
  text-align: center;
}

.spinner-border.text-primary {
  position: relative;
  top: 160px;
}
</style>
