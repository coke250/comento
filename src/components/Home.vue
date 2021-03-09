<template>
    <div class="container">
        <div class="card-wrapper">
            <div class="filter-container">
            <div class="flex flex-row flex-v-middle flex-between mb-15">
                <ul class="radio-nav-group">
                    <li v-for="(order, index) in orders" 
                        v-bind:class="{active: order.active}" 
                        @click="toggleActive(index)"
                        v-bind:key="index"
                        >
                            {{order.text}}
                    </li>
                </ul>
                <button class="btn btn-sm" @click="showModal = true"> <span class="text-caption">필터</span></button>
                </div>
            </div>
            <section>
                <template v-for="(feed, index) in feeds">
                    <Feed v-if="index == 0 || index % 4 != 0" v-bind:key="feed.id" v-bind:feed="feed" @click.native="moveDetail(feed.id)" />
                    <template v-else-if="index > 0 && index % 4 == 0">
                        <Advertisement v-bind:key="'ad'+feed.id" v-bind:ad="ads[index]" />
                        <Feed v-bind:key="feed.id" v-bind:feed="feed" @click.native="moveDetail(feed.id)" />
                    </template>
                </template>
                <div ref="lastChild">
                </div>
            </section>
        </div>
        <div class="sider">
            <nav class="sider-nav">
                <button class="btn-green">로그인</button>
            </nav>
        </div>
        <Category v-if="showModal" @close="showModal = false"/>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Feed from './Feed'
import Category from './Category'
import Advertisement from './Advertisement'

export default {
    name: 'Home',
    data(){
        return{
            io: null,
            selectedIndex: 0,
            orders: [
                {
                    text: "오름차순",
                    value: 'asc',
                    active: true,
                },
                {
                    text: "내림차순",
                    value: 'desc',
                    active: false,
                }
            ],
            showModal: false,
        }
    },
    components: {
        Feed,
        Category,
        Advertisement,
    },
    computed:{
        ...mapGetters(["feeds", "nextPageUrl", "ads", "detail"]),
    },
    methods: {
        ...mapActions(["fetchPages", "addPages", "setOrder", "fetchDetail"]),
        toggleActive(i){
           this.orders.forEach((order, index) => {
               order.active = (index === i);

               if(order.active) this.setOrder(order.value);
           })
        },
        moveDetail(id){
            this.fetchDetail(id);
            this.$router.push({
                name: 'Detail',
                params:{
                    id: id
                }
            });
        }
    },
    created(){
        if(this.feeds.length == 0) this.fetchPages();
    },
    mounted(){
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    const target = entry.target;
                    observer.unobserve(target);

                    if(!this.nextPageUrl) return;

                    this.addPages();
                    setTimeout(()=>{
                        observer.observe(target);
                    }, 1000);
                }
            })
        }, {threshold: 1.0});

        this.io = io;
        const lastChild = this.$refs.lastChild;

        if(lastChild){
            setTimeout(() => {
                io.observe(lastChild);
            }, 1000) ;
        }
    },
    unmounted() {
        this.io.disconnect();
    },
}
</script>