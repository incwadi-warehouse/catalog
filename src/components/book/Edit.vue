<template>
  <b-form @submit.prevent="update" v-if="book">
    <b-modal @close="$emit('close')">
      <b-container size="m" v-if="book.reserved">
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

      <b-container size="m" v-if="book">
        <!-- genre -->
        <b-form-group>
          <b-form-item>
            <b-form-label for="genre">
              {{ $t('genre') }}
            </b-form-label>
          </b-form-item>
          <b-form-item>
            <b-form-select id="genre" required v-model="state.genreId">
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
            <b-form-select id="cond" v-model="state.cond_id">
              <option value=""></option>
              <option
                :value="item.id"
                v-for="item in condition.state.conditions"
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
            <span v-for="(item, index) in tag.state.tags" :key="item.id">
              {{ item.name }}
              <span @click="tag.remove(item.id)">
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

        <!-- cover -->
        <div v-if="cover">
          <!-- status -->
          <b-notification type="neutral" v-if="isUploading">
            <p>{{ $t('uploadingFile') }}</p>
          </b-notification>
          <b-notification type="error" hidable v-if="hasErrorUploading">
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

          <!-- upload -->
          <div v-else>
            <b-form
              enctype="multipart/form-data"
              @submit.prevent
              v-if="!isUploading"
            >
              <b-form-group>
                <b-form-item>
                  <b-form-label for="cover">{{ $t('cover') }}</b-form-label>
                </b-form-item>
                <b-form-item
                  :style="{
                    position: 'relative',
                    height: '300px',
                    border: isDragging
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
                    @dragover="isDragging = true"
                    @dragenter="isDragging = true"
                    @dragleave="isDragging = false"
                    @dragend="isDragging = false"
                    @drop="isDragging = false"
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
          </div>
        </div>
      </b-container>
    </b-modal>
  </b-form>
</template>

<script>
import { onMounted, reactive, computed } from '@vue/composition-api'
import useGenre from '@/composables/useGenre'
import useCondition from '@/composables/useCondition'
import useFormat from '@/composables/useFormat'
import useTag from '@/composables/useTag'

export default {
  name: 'edit-book',
  props: ['book', 'me'],
  setup(props, { emit }) {
    const state = reactive({
      added: computed(() => {
        let date = new Date(props.book.added)

        return date.toISOString().split('T')[0]
      }),
      title: computed(() => {
        return props.book ? props.book.title : null
      }),
      shortDescription: computed(() => {
        return props.book ? props.book.shortDescription : null
      }),
      authorFirstname: computed(() => {
        return props.book.author ? props.book.author.firstname : null
      }),
      authorSurname: computed(() => {
        return props.book.author ? props.book.author.surname : null
      }),
      genreId: computed(() => {
        return props.book.genre ? props.book.genre.id : null
      }),
      price: computed(() => {
        return props.book ? props.book.price : null
      }),
      sold: computed(() => {
        return props.book ? props.book.sold : null
      }),
      removed: computed(() => {
        return props.book ? props.book.removed : null
      }),
      reserved: computed(() => {
        return props.book ? props.book.reserved : null
      }),
      releaseYear: computed(() => {
        return props.book ? props.book.releaseYear : null
      }),
      cond_id: computed(() => {
        return props.book.condition ? props.book.condition.id : null
      }),
      tag: computed(() => {
        return null
      }),
      tags: computed(() => {
        return props.book ? props.book.tags : null
      }),
      recommendation: computed(() => {
        return props.book ? props.book.recommendation : null
      }),
      isUploading: computed(() => {
        return false
      }),
      hasErrorUploading: computed(() => {
        return false
      }),
      isDragging: computed(() => {
        return false
      }),
      format: computed(() => {
        return props.book.format ? props.book.format.id : null
      }),
      cover: computed(() => {
        return null
      }),
    })

    const genre = useGenre()
    const condition = useCondition()
    const format = useFormat()
    const tag = useTag()

    onMounted(() => {
      // get cover
    })

    const update = () => {
      let tags = []
      state.tags.forEach((element) => {
        tags.push(element.id)
      })

      emit('update', {
        me: state.me,
        id: state.book.id,
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
      })
    }

    const upload = (event) => {
      this.isUploading = true
      const file = event.target.files[0]
      const form = new FormData()
      form.append('cover', file)
      emit('cover-upload', { id: this.book.id, form: form })
    }

    const removeCover = () => {
      // remove cover
    }

    return { state, genre, condition, format, tag, update, upload, removeCover }
  },
}
</script>
