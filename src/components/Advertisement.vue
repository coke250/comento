<template>
    <article>
        <a class="card">
            <p class="flex flex-row flex-v-middle flex-between h7 mb-15">
                <span class="text-caption">sponsored</span>
            </p>
            <hr>
            <div class="clearfix">
                <img class="ad-img mr-30" ref="img" />
                <h1 class="card-title">{{title}}</h1>
                <p class="mb-20">{{contents}} </p>
            </div>
        </a>
    </article>
</template>

<script>

const IMAGE_URL = 'https://cdn.comento.kr/assignment/';

export default {
    name: 'Advertisement',
    props: ['ad'],
    data(){
        return {
            io: null,
        }
    },
    computed:{
        title(){
            return this.ad.title.length > 80 ? this.ad.title.substring(0, 80) + '...' : this.ad.title;
        },
        contents(){
            return this.ad.contents.length > 80 ? this.ad.contents.substring(0, 80) + '...' : this.ad.contents;
        }
    },
    mounted(){
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const target = entry.target;
                    target.src =  IMAGE_URL + this.ad.img;
                    observer.disconnect(target);
                }
            })
        }, {threshold: 0.5});

        this.io = io;
        const img = this.$refs.img;

        io.observe(img);
    },
    unmounted() {
        this.io.disconnect();  
    },
}
</script>