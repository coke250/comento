<template>
    <div class="modal-mask">
        <div class="modal-container">
            <div>
                <div class="clearfix">
                    <button class="btn-close float-right" @click="$emit('close')"></button>

                </div>
                <h3 class="mb-15">필터</h3>
                <label class="checkbox-container text-normal" v-for="cat in category" :key="cat.id">
                    {{cat.name}}
                    <input type="checkbox" v-model="cat.checked">
                    <span class="checkmark"></span>
                </label>
                <button class="btn-green float-right" @click="$emit('close')">저장하기</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'Category',
    computed: {
        ...mapGetters(["category"]),
    },
    methods: {
        ...mapActions(["updateCategory"]),
    },
    mounted() {

    }
}
</script>