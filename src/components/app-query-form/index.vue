<template>
  <div class="app-search-list-form">
    <el-form
      ref="paramsRef"
      :model="formData"
      :label-width="labelWidth"
      label-position="left"
      :key="keys"
    >
      <el-row :gutter="20">
        <template v-for="item in state.formItems" :key="item.label">
          <el-col :span="span" v-if="item.type === 'input'">
            <el-form-item :label="item.label">
              <el-input
                :show-password="item.type === 'password'"
                v-model="formData[item.field]"
                :placeholder="item.placeholder"
                @keyup.enter="loadData()"
                clearable
                @clear="loadData()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="span" v-if="item.type === 'select'">
            <el-form-item :label="item.label">
              <el-select
                v-model="formData[item.field]"
                clearable
                :placeholder="item.placeholder"
                :multiple="item.isMultiple || false"
                :collapse-tags="item.isCollapseTags || false"
                :collapse-tags-tooltip="item.isCollapseTagsTooltip || false"
                :allow-create="item.isAllowCreate || false"
                :filterable="item.isFilterable || false"
                :default-first-option="item.isDefaultFirstOption || false"
                @change="loadData()"
                @clear="loadData()"
              >
                <el-option
                  v-for="yitem in item.list"
                  :key="yitem.value || yitem.id || yitem.dataTypeCode"
                  :label="yitem.label || yitem.name || yitem.dataTypeName"
                  :value="yitem.value || yitem.id || yitem.dataTypeCode"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="span" v-if="item.type === 'date'">
            <el-form-item :label="item.label" :placeholder="item.placeholder">
              <el-date-picker
                v-model="formData[item.field]"
                clearable
                :type="item.dateType"
                :placeholder="item.placeholder"
                :size="item.size"
                :format="item.format"
                :value-format="item.valueFormat"
                @change="loadData()"
                @clear="loadData()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="item.span ? item.span : span" v-if="item.type === 'dateRange'">
            <el-form-item :label="item.label" :placeholder="item.placeholder">
              <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="formData[item.field]"
                type="daterange"
                range-separator="-"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
                @change="handleDateRangeChange(item)"
                @clear="loadData()"
              />
            </el-form-item>
          </el-col>
          <el-col :span="span" v-if="item.type === 'cascader'">
            <el-form-item :label="item.label" :placeholder="item.placeholder">
              <el-cascader
                v-model="cascaderArr"
                :placeholder="item.placeholder"
                :options="item.list"
                :props="item.cascaderProps"
                clearable
                filterable
                @change="cascaderChange"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col :span="setSpan()" style="text-align: right">
          <slot name="btn"></slot>
          <el-button type="primary" link @click="anPackUpClick"
            >{{ isFormItems ? '收起' : '展开' }}
            <i
              style="font-size: 20px"
              :class="isFormItems ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'"
            ></i>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script lang="ts" setup name="preCharge">
import { defineProps, ref, PropType, reactive } from 'vue'
import { ElForm } from 'element-plus'
import { ReturnVoid } from '@/views/layout/__VLS_types'
const props = defineProps({
  formItems: {
    type: Array as any,
    default: () => {
      return []
    },
  },
  dataParams: {
    type: Object as PropType<any>,
  },
  span: {
    type: Number,
    default: 6,
  },
  labelWidth: {
    type: String,
    default: '100px',
  },
  loadData: {
    type: Function,
  },
  sliceNum: {
    type: Number,
    default: 2,
  },
  cascaderArr: {
    type: Array as any,
  },
  keys: {
    type: Number,
  },
})
const emits = defineEmits<{
  (e: 'update:dataParams', val: any): ReturnVoid
  (e: 'cascaderChange', val: any): Void
}>()
const paramsRef = ref<InstanceType<typeof ElForm>>()
const formData = computed({
  get: () => props.dataParams,
  set: val => {
    if (val) {
      emits('update:dataParams', val)
    }
  },
})
const cascaderArr = computed({
  get: () => props.cascaderArr,
  set: val => {},
})

const isFormItems = ref(false)

const state = reactive({
  formItems: [] as any,
})
function handleDateRangeChange(item) {
  formData.value[item.keys[0]] = formData.value[item.field][0]
  formData.value[item.keys[1]] = formData.value[item.field][1]
}

const setSpan = () => {
  // dateRange
  let formItemLength = state.formItems.length
  state.formItems.forEach((item: any) => {
    if (item.type === 'dateRange' && item.span == 12) {
      formItemLength += 1
    }
  })
  return formItemLength % (24 / props.span) == 0 ? 24 : props.span
}
/**
 * 级联选择器，在各自组件单独取值
 * @param val 选中数据
 */
const cascaderChange = (val: any) => {
  emits('cascaderChange', val)
}
const anPackUpClick = () => {
  if (isFormItems.value) {
    isFormItems.value = false
  } else {
    isFormItems.value = true
  }
  state.formItems = isFormItems.value ? props.formItems : props.formItems.slice(0, props.sliceNum)
}
state.formItems = isFormItems.value ? props.formItems : props.formItems.slice(0, props.sliceNum)
</script>
