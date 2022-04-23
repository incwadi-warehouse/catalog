<template>
  <b-form
    @submit.prevent="update"
    v-if="
      book.state.book &&
      genre.state.genres.length >= 1 &&
      format.state.formats.length >= 1 &&
      condition.state.conditions.length >= 1
    "
  >
    <b-modal @close="$emit('close')">
      <b-container size="m" v-if="book.state.book.reserved">
        <b-alert type="warning">
          <p>{{ $t('doNotEditReservedBooks') }}</p>
        </b-alert>
      </b-container>

      <template #title>
        {{ $t('edit_book') }}
      </template>

      <template #footer>
        <b-form-group>
          <b-form-item>
            <b-button design="primary_wide">
              {{ $t('update') }}
            </b-button>
          </b-form-item>
        </b-form-group>
      </template>

      <b-container size="m" v-if="book.state.book">
        <!-- genre -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select
              id="genre"
              required
              v-model="state.genreId"
              :items="genre.state.genres"
              item-key="id"
              item-value="name"
              allow-empty
            />
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
              :rows="4"
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
            <b-form-label for="releaseYear">
              {{ $t('release_year') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-input
              type="number"
              id="releaseYear"
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
            <b-form-select
              id="type"
              v-model="state.format"
              :items="format.state.formats"
              item-key="id"
              item-value="name"
              allow-empty
            />
          </b-form-item>
        </b-form-group>

        <!-- price -->
        <b-form-group>
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
              v-if="me && me.branch.steps > 0"
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

        <!-- sold -->
        <b-form-group>
          <b-form-item>
            <input type="checkbox" name="sold" id="sold" v-model="state.sold" />
            <b-form-label for="sold">
              {{ $t('sold') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- removed -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="removed"
              id="removed"
              v-model="state.removed"
            />
            <b-form-label for="removed">
              {{ $t('removed') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- reserved -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="reserved"
              id="reserved"
              v-model="state.reserved"
            />
            <b-form-label for="reserved">
              {{ $t('reserved') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

        <!-- recommendation -->
        <b-form-group>
          <b-form-item>
            <input
              type="checkbox"
              name="recommendation"
              id="recommendation"
              v-model="state.recommendation"
            />
            <b-form-label for="recommendation">
              {{ $t('recommendation') }}
            </b-form-label>
          </b-form-item>
        </b-form-group>

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
            <b-form-select
              id="cond"
              v-model="state.cond_id"
              :items="condition.state.conditions"
              item-key="id"
              item-value="name"
              allow-empty
            />
          </b-form-item>
        </b-form-group>

        <!-- tags -->
        <b-form @submit.prevent="createTag({ name: state.tag })">
          <b-form-group>
            <span v-for="(item, index) in state.tags" :key="item.id">
              {{ item.name }}
              <span @click="removeTag(item.id)">
                <b-icon type="close" :size="12" />
              </span>
              <span v-if="index !== state.tags.length - 1">, </span>
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

        <!-- cover -->
        <div v-if="cover">
          <!-- status -->
          <b-notification type="neutral" v-if="state.isUploading">
            <p>{{ $t('uploadingFile') }}</p>
          </b-notification>
          <b-notification type="error" hidable v-if="state.hasErrorUploading">
            <p>{{ $t('coverUploadError') }}</p>
          </b-notification>

          <div v-if="cover.cover_s || cover.cover_m || cover.cover_l">
            <!-- remove -->
            <b-button
              type="button"
              design="outline_danger"
              @click="removeCover"
              :style="{ float: 'right' }"
            >
              {{ $t('removeCover') }}
            </b-button>

            <!-- show -->
            <img :src="cover.cover_m" alt="Cover" />
          </div>

          <div v-else>
            <!-- tabs -->
            <div class="tabs">
              <ul>
                <li @click="tab = 'upload'">{{ $t('upload') }}</li>
                <li @click="tab = 'file-manager'">
                  {{ $t('file_manager') }} (Experiment)
                </li>
              </ul>
            </div>

            <!-- upload -->
            <b-form
              enctype="multipart/form-data"
              @submit.prevent
              v-if="!state.isUploading && tab == 'upload'"
            >
              <b-form-group>
                <b-form-item>
                  <b-form-label for="cover">{{ $t('cover') }}</b-form-label>
                </b-form-item>
                <b-form-item
                  :style="{
                    position: 'relative',
                    height: '300px',
                    border: state.isDragging
                      ? '1px solid var(--color-primary-10)'
                      : '1px solid var(--color-neutral-02)',
                    borderRadius: '5px',
                  }"
                >
                  <p
                    :style="{
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '100%',
                      textAlign: 'center',
                    }"
                  >
                    {{ $t('drop_the_file_in_this_area_or_click_here') }}
                  </p>
                  <div
                    :style="{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                    }"
                    @dragover="state.isDragging = true"
                    @dragenter="state.isDragging = true"
                    @dragleave="state.isDragging = false"
                    @dragend="state.isDragging = false"
                    @drop="state.isDragging = false"
                  >
                    <b-form-input
                      type="file"
                      id="cover"
                      @change="upload($event)"
                      event
                      accept="image/jpeg, image/jpg, image/png, image/webp"
                      :style="{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: '0.001',
                      }"
                    />
                  </div>
                </b-form-item>
              </b-form-group>
            </b-form>

            <!-- directory -->
            <directory-file-manager
              :id="book.id"
              @update="setCover"
              v-if="tab == 'file-manager'"
            />
          </div>
        </div>
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
import {
  onMounted,
  reactive,
  computed,
  toRefs,
  watch,
  ref,
} from '@vue/composition-api'
import useGenre from '@/composables/useGenre'
import useCondition from '@/composables/useCondition'
import useFormat from '@/composables/useFormat'
import useTag from '@/composables/useTag'
import useBook from '@/composables/useBook'
import DirectoryFileManager from '@/components/directory/FileManager'
import BookPriceCalculator from '@/components/book/PriceCalculator'
import { remove as _remove } from 'lodash'
import router from './../../router'

export default {
  name: 'book-edit',
  props: {
    bookId: String,
    me: Object,
  },
  components: {
    DirectoryFileManager,
    BookPriceCalculator,
  },
  setup(props, { emit }) {
    const genre = useGenre()
    const condition = useCondition()
    const format = useFormat()
    const tag = useTag()
    const book = useBook()

    let state = reactive({
      added: null,
      title: null,
      shortDescription: null,
      authorFirstname: null,
      authorSurname: null,
      genreId: null,
      price: null,
      sold: null,
      removed: null,
      reserved: null,
      releaseYear: null,
      cond_id: null,
      tag: null,
      tags: [],
      recommendation: null,
      isUploading: false,
      hasErrorUploading: false,
      isDragging: false,
      format: null,
    })

    const loadBook = () => {
      book.show(bookId.value).then(() => {
        state.added = formatDate(book.state.book.added)
        state.title = book.state.book.title
        state.shortDescription = book.state.book.shortDescription
        state.authorFirstname = book.state.book.author
          ? book.state.book.author.firstname
          : null
        state.authorSurname = book.state.book.author
          ? book.state.book.author.surname
          : null
        state.genreId = book.state.book.genre ? book.state.book.genre.id : null
        state.price = book.state.book.price
        state.sold = book.state.book.sold
        state.removed = book.state.book.removed
        state.reserved = book.state.book.reserved
        state.releaseYear = book.state.book.releaseYear
        state.cond_id = book.state.book.condition
          ? book.state.book.condition.id
          : null
        state.tag = null
        state.tags = book.state.book.tags
        state.recommendation = book.state.book.recommendation
        state.format = book.state.book.format ? book.state.book.format.id : null
      })
    }

    const { bookId } = toRefs(props)
    loadBook()
    watch(
      () => bookId.value,
      () => {
        loadBook()
      }
    )

    const update = () => {
      let tags = []
      state.tags.forEach((element) => {
        tags.push(element.id)
      })

      emit('update', {
        me: state.me,
        id: bookId.value,
        params: {
          added: new Date(state.added).getTime() / 1000,
          title: state.title,
          shortDescription: state.shortDescription,
          author: state.authorSurname + ',' + state.authorFirstname,
          genre: state.genreId,
          price: state.price,
          sold: state.sold,
          removed: state.removed,
          reserved: state.reserved,
          releaseYear: state.releaseYear,
          cond: state.cond_id,
          tags: tags,
          recommendation: state.recommendation,
          format: state.format,
        },
      })

      emit('close')
      router.push({ name: 'search' })
    }

    const formatDate = (val) => {
      let date = new Date(val * 1000)

      return date.toISOString().split('T')[0]
    }

    const cover = computed(() => {
      return book.state.cover
    })

    onMounted(() => {
      book.getCover(bookId.value)
    })

    const upload = (event) => {
      state.isUploading = true
      const file = event.target.files[0]
      const form = new FormData()
      form.append('cover', file)
      emit('cover-upload', { id: this.book.id, form: form })
    }

    const removeCover = () => {
      book.removeCover(bookId.value)
    }

    const tab = ref('upload')

    const { me } = toRefs(props)

    const pricelist = computed(() => {
      return me.value ? JSON.parse(me.value.branch.pricelist) : null
    })

    const createTag = (item) => {
      tag.create(item).then((res) => {
        state.tags.push(res.data)
      })
    }

    const removeTag = (id) => {
      _remove(state.tags, (item) => {
        return id === item.id
      })
      state.tags = Object.assign([], state.tags)
      console.log(state.tags)
    }

    return {
      state,
      genre,
      condition,
      format,
      tag,
      cover,
      book,
      tab,
      update,
      upload,
      removeCover,
      pricelist,
      createTag,
      removeTag,
    }
  },
}
</script>

<style scoped>
.tabs {
  margin: 10px 0;
  overflow: auto;
}
.tabs ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tabs li {
  float: left;
  background: var(--color-neutral-02);
  border-radius: 10px;
  padding: 10px;
  margin-right: 20px;
  cursor: pointer;
}
</style>
