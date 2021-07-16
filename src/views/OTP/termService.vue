<template>
  <div class="termService">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <v-col cols="12" class="title-section">
          <h2>เงื่อนไขการใช้บริการ</h2>
        </v-col>
        <v-col cols="12" class="body-section">
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna a liquyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
          sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          d olore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
          et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
          takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
          amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
          invidunt ut labore et dolore magn a aliquyam erat, sed diam voluptua.
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita
          kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
          amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
          diam nonumy eirmod tempor invidunt ut labore et dolore magna ali quyam
          erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
          et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
          Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet, consetetur sa
          dipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
          dolore magna aliquyam erat, sed diam
        </v-col>
        <v-col cols="12" class="button-section">
          <v-btn
            block
            rounded
            dark
            dense
            height="49"
            color="#c71e2b"
            @click="$router.push('/OTP/emailVerify')"
            >ยอมรับเงื่อนไข</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "TermService",
};
</script>

<style lang="scss">
.termService {
  height: 100vh;
  padding: 0 16px;
  max-width: 700px;
  margin: 0 auto;
  .title-section {
    height: 100px;
    font-size: 21px;
    display: flex;
    align-items: center;
  }
  .body-section {
    height: calc(100vh - 180px);
    overflow-y: scroll;
    font-size: 14px;
  }
  .button-section {
    margin: 0 auto;
    height: 80px;
    display: flex;
    max-width: 350px;
    align-items: center;
  }
}
</style>