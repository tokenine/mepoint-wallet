<template>
    <div class="app-alert">
        <v-dialog v-model="dialog" persistent min-width="250" max-width="300">
            <v-card class="alert-box">
                <v-row>
                    <v-col cols="12" v-if="dialogData.header != ''">
                        <h3 v-html="dialogData.header"></h3>
                    </v-col>
                    <v-col cols="12" class="my-2" v-if="dialogData.type != 'notice'">
                        <v-img v-if="dialogData.type == 'success'" src="/image/checked.png" height="80px" contain></v-img>
                        <v-img v-if="dialogData.type == 'error'" src="/image/error.png" height="80px" contain></v-img>
                        <v-img v-if="dialogData.type == 'errordontlogin'" src="/image/error.png" height="80px" contain></v-img>
                        <v-img v-if="dialogData.type == 'confirm'" src="/image/complain.png" height="80px" contain></v-img>
                    </v-col>
                    <v-col cols="12">
                        <p v-html="dialogData.title"></p>
                    </v-col>
                    <v-col cols="12" class="px-5">
                        <v-btn rounded large color="success" block @click="done(true)" v-if="dialogData.type == 'success'">ตกลง
                        </v-btn>
                        <v-btn rounded large color="error" block @click="done(true)" v-if="dialogData.type == 'error'">ตกลง
                        </v-btn>
                        <v-btn rounded large color="error" block @click="backToHome(true)" v-if="dialogData.type == 'errordontlogin'">ตกลง
                        </v-btn>
                        <v-btn rounded large color="info" block @click="done(true)" v-if="dialogData.type == 'notice'">ตกลง
                        </v-btn>
                        <v-btn class="mr-2" fab elevation="1" color="error" @click="done(false)" v-if="dialogData.type == 'confirm'">
                            <v-icon dark class="ico">close</v-icon>
                        </v-btn>
                        <v-btn class="ml-2" fab elevation="1" color="success" @click="done(true)" v-if="dialogData.type == 'confirm'">
                            <v-icon dark class="ico">done</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
    export default {
        name: 'AppAlert',
        computed: {
            dialog() {
                return this.$store.state.app.alert;
            },
            dialogData() {
                return this.$store.state.app.alert_data;
            }
        },
        data() {
            return {

            }
        },
        methods: {
            done(val) {
                this.$store.state.app.alert_resolve(val);
                this.alert_close();
            },
            backToHome(val) {
                this.$store.state.app.alert_resolve(val);
                this.alert_close();
            try {
                 this.$router.push("/splashScreen");
            } catch (err) {
                console.error(err);
            }
    },
        }
    }
</script>
<style lang="scss">
    .alert-box {
        padding: 20px;
        text-align: center;
    }

    .v-sheet.v-card {
        border-radius: 8px !important;
    }
</style>