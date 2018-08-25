<template>
  <v-footer
    dark
    height="auto"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="(icon, index) in icons"
          :key="index"
          class="mx-3 white--text"
          icon
        >
          <a :href="icon.url" target="_blank">
            <v-icon size="24px">{{ icon.icon }}</v-icon>
          </a>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Ari Supriatna</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      icons: [
        {
          icon: 'fa fa-facebook',
          url: 'https://www.facebook.com/profile.php?id=100010804383796'
        },
        {
          icon: 'fa fa-twitter',
          url: 'https://twitter.com/arisupriatna141'
        },
        {
          icon: 'fa fa-google-plus',
          url: 'https://plus.google.com/u/0/118373014150443713337'
        },
        {
          icon: 'fa fa-linkedin',
          url: 'https://www.linkedin.com/in/arisupriatna/'
        },
        {
          icon: 'fa fa-instagram',
          url: 'https://www.instagram.com/arisupriatna1408/'
        }
      ]
    })
  }
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
