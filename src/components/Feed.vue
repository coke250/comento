<template>
    <article>
        <a class="card">
            <p class="flex flex-row flex-v-middle flex-between h7 mb-15">
                <span class="text-caption">{{categoryName}}</span>
                <span class="text-caption">{{feed.id}}</span>
            </p>
            <hr>
            <p class="h7 mb-15">
                <span class="text-primary border-right">{{feed.user_id}}</span>
                <span>{{createdAt}}</span>
            </p>
            <h1 class="card-title">{{title}}</h1>
            <p class="mb-20">{{contents}}</p>
        </a>
    </article>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: 'Feed',
    props: ['feed'],
    computed:{
        ...mapGetters(["getCategoryNameById"]),
        categoryName(){
            return this.getCategoryNameById(this.feed.category_id);
        },
        createdAt(){
            return this.feed.created_at.substring(0, 10);
        },
        title(){
            return this.feed.title.length > 80 ? this.feed.title.substring(0, 80) + '...' : this.feed.title;
        },
        contents(){
            return this.feed.contents.length > 80 ? this.feed.contents.substring(0, 80) + '...' : this.feed.contents;
        }
    },
}
</script>