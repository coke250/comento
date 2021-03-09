<template>
    <div class="container">
        <div class="card-wraper">
            <article>
                <div class="card-detail">
                    <div class="card-title">{{detail.title}}</div>
                    <div class="mb-20">{{detail.contents}}</div>
                    <div class="text-caption">{{createdAt(detail.created_at)}}</div>
                </div>
                <div>
                    <span class="text-normal mr-5">답변</span><span class="text-primary">{{replyLength}}</span>
                    <div class="card" v-for="rep in detail.reply" :key="rep.id">
                        <div class="text-normal2">{{rep.user.name}}</div>
                        <hr>
                        <div class="mb-15">{{rep.contents}}</div>
                        <div class="text-caption">{{createdAt(rep.user.created_at)}}</div>
                    </div>
                </div>
            </article>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'Detail',
    props: ['id'],
    computed:{
        ...mapGetters(['detail']),
        replyLength(){
            if(this.detail.reply === undefined) return 0;

            return this.detail.reply.length;
        }
    },
    methods: {
        ...mapActions(['fetchDetail']),
        createdAt: function(date){
            if(date === undefined) return;

            return date.substring(0, 10);
        },
    }
}
</script>