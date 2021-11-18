<template>
  <b-form @submit.prevent="create">
    <b-modal @close="$emit('close')">
      <template #title>
        <b-icon type="plus" :size="15" no-hover /> {{ $t('catalog') }}
      </template>

      <template #footer>
        <b-form-group>
          <b-form-item>
            <b-button design="primary_wide">
              {{ $t('add') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m">
        <!-- genre -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="genre" required v-model="state.genreId">
              <option></option>
              <option
                v-for="item in genre.state.genres"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <!-- title -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="title">
              {{ $t('title') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="title"
              maxlength="255"
              required
              v-model="state.title"
            />
          </b-form-item>
        </b-form-group>

        <!-- short description -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="shortDescription">
              {{ $t('shortDescription') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-textarea
              type="text"
              id="shortDescription"
              :rows="5"
              v-model="state.shortDescription"
            />
          </b-form-item>
        </b-form-group>

        <!-- firstname -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="authorFirstname">
              {{ $t('firstname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorFirstname"
              maxlength="255"
              v-model="state.authorFirstname"
            />
          </b-form-item>
        </b-form-group>

        <!-- surname -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="authorSurname">
              {{ $t('surname') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="text"
              id="authorSurname"
              maxlength="255"
              required
              v-model="state.authorSurname"
            />
          </b-form-item>
        </b-form-group>

        <!-- release year -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="author">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="author"
              min="1000"
              max="9999"
              required
              v-model="state.releaseYear"
            />
          </b-form-item>
        </b-form-group>

        <!-- format -->
        <b-form-group v-if="format.state.formats">
          <b-form-item>
            <b-form-label for="format">
              {{ $t('format') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="type" v-model="state.format">
              <option
                v-for="item in format.state.formats"
                :value="item.id"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <!-- price -->
        <b-form-group v-if="me">
          <b-form-item>
            <b-form-label for="price">
              {{ $t('price') }}
              <span v-if="me">({{ me.branch.currency }})</span>
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="price"
              :step="me.branch.steps"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="state.price"
              v-if="me.branch && me.branch.steps > 0"
            />
            <b-form-input
              type="text"
              id="price"
              pattern="^\d+(\.|,)?\d{0,2}$"
              required
              v-model="state.price"
              v-else
            />
          </b-form-item>
        </b-form-group>

        <details v-if="me">
          <summary>{{ $t('pricelist') }}</summary>
          <book-price-calculator
            :list="pricelist"
            :currency="me.branch.currency"
          />
        </details>

        <!-- added -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="added">
              {{ $t('added') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input type="date" id="added" v-model="state.added" />
          </b-form-item>
        </b-form-group>

        <!-- condition -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="cond">
              {{ $t('condition') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="cond" v-model="state.cond_id">
              <option value=""></option>
              <option
                :value="item.id"
                v-for="item in condition.state.condition"
                :key="item.id"
              >
                {{ item.name }}
              </option>
            </b-form-select>
          </b-form-item>
        </b-form-group>

        <!-- tags -->
        <b-form @submit.prevent="tag.create({ name: state.tag })">
          <b-form-group>
            <span v-for="(tag, index) in tags" :key="tag.id">
              {{ tag.name }}
              <span @click="tag.remove(tag.id)">
                <b-icon type="close" :size="12" />
              </span>
              <span v-if="index !== tags.length - 1">, </span>
            </span>
          </b-form-group>

          <b-form-group>
            <b-form-item>
              <b-form-label for="tag">{{ $t('add_tag') }}</b-form-label>
            </b-form-item>
            <b-form-item>
              <b-form-input type="text" id="tag" v-model="state.tag" />
            </b-form-item>
          </b-form-group>

          <b-form-group buttons>
            <b-button design="outline">{{ $t('add_tag') }}</b-button>
          </b-form-group>
        </b-form>
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
import { computed, reactive, toRefs } from '@vue/composition-api'
import BookPriceCalculator from '@/components/book/PriceCalculator'
import useGenre from '@/composables/useGenre'
import useCondition from '@/composables/useCondition'
import useFormat from '@/composables/useFormat'
import useTag from '@/composables/useTag'

export default {
  name: 'create-book',
  components: {
    BookPriceCalculator,
  },
  props: {
    me: Object,
  },
  setup(props, { emit }) {
    const { me } = toRefs(props)

    const state = reactive({
      added: computed(() => {
        let date = new Date()

        return date.toISOString().split('T')[0]
      }),
      title: null,
      shortDescription: null,
      authorFirstname: '',
      authorSurname: null,
      genreId: null,
      price: '2.50',
      sold: false,
      removed: false,
      releaseYear: new Date().getFullYear(),
      cond_id: null,
      tags: [],
      tag: null,
      format: null,
    })

    const genre = useGenre()
    const condition = useCondition()
    const format = useFormat()
    const tag = useTag()

    const pricelist = computed(() => {
      return me ? JSON.parse(me.value.branch.pricelist) : null
    })

    const create = () => {
      let tags = []
      state.tags.forEach((element) => {
        tags.push(element.id)
      })
      emit('create', {
        added: new Date(this.added).getTime() / 1000,
        title: this.title,
        shortDescription: this.shortDescription,
        author: this.authorSurname + ',' + this.authorFirstname,
        genre: this.genreId,
        price: this.price,
        sold: false,
        removed: false,
        releaseYear: this.releaseYear,
        cond: this.cond_id,
        tags: tags,
        format: this.format,
      })
    }

    return {
      state,
      pricelist,
      genre,
      condition,
      format,
      tag,
      create,
    }
  },
}
</script>
