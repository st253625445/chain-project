<template>
  <div class="filterBox">
    <div class="filterBox-title">
      <span class="totalText">{{ totalIndex }} of {{ filterdata.totalNum }} 条数据</span>
      <el-tooltip class="item" effect="dark" content="展开/隐藏筛选条件" placement="bottom">
        <el-button
          :class="openFilter ? 'el-button-on' : ''"
          class="icon-button"
          icon="el-icon-sort"
          circle
          @click="changeOpenFilter"
        />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="下载表格" placement="bottom">
        <el-button class="icon-button" icon="el-icon-download" circle @click="downLoad"/>
      </el-tooltip>
    </div>
    <div v-if="openFilter" class="filterBox-cunt">
      <div v-for="(item, index) in filterFrom" :key="index" class="filterRow">
        <el-cascader
          :options="filterdata.options"
          :show-all-levels="false"
          v-model="item.selectedOptions"
          @change="(value) => handleChange(value, index)"
        />
        <template>
          <el-popover
            v-if="item.selectedOptions[item.selectedOptions.length-1] === 'investment_type'"
            v-model="visibleShow"
            placement="bottom-start"
            width="650"
          >
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="val => handleCheckAllChange(val, index, typeOptions(item.selectedOptions))"
            >全选</el-checkbox>
            <el-checkbox-group
              v-model="item.text"
              @change="val => handleCheckedChange(val, index, typeOptions(item.selectedOptions))"
            >
              <el-checkbox
                v-for="typeitem in typeOptions(item.selectedOptions)"
                :label="typeitem"
                :key="typeitem"
                class="filter-el-checkbox"
              >{{ typeitem }}</el-checkbox>
            </el-checkbox-group>
            <div style="text-align: right; margin: 0">
              <el-button type="primary" size="mini" @click="visibleShow = false">确定</el-button>
            </div>
            <el-button slot="reference" style="margin-right:20px;">展开选项</el-button>
          </el-popover>
          <el-select
            v-else-if="item.selectedOptions[item.selectedOptions.length-1] === 'timeNode'"
            v-model="item.text"
            filterable
            allow-create
            default-first-option
            placeholder="请选择年份节点"
          >
            <el-option
              v-for="typeitem in yearsBuild()"
              :key="typeitem.value"
              :label="typeitem.label"
              :value="typeitem.value"
            />
          </el-select>
          <el-select
            v-else
            v-model="item.type"
            placeholder="请选择"
            @change="(value) => typeChange(value, index, item.selectedOptions)"
          >
            <el-option
              v-for="typeitem in typeOptions(item.selectedOptions)"
              :key="typeitem.value"
              :label="typeitem.label"
              :value="typeitem.value"
            />
          </el-select>
        </template>
        <template
          v-if="['investment_type', 'timeNode'].indexOf(item.selectedOptions[item.selectedOptions.length-1]) < 0"
        >
          <el-input
            v-if="input_string(item.type)"
            v-model.trim="item.text"
            :placeholder="item.placeholder"
          />
          <template v-if="input_autoContain(item.type)">
            <el-input
              v-model.trim="autoContainKeyWord"
              :placeholder="item.placeholder"
              @focus="autoContainInputFocus"
            />
            <div v-if="autoContainPopoverShow" class="autoContainPopover">
              <el-checkbox
                :indeterminate="autoContainIsIndeterminate"
                v-model="autoContainCheckAll"
                @change="val => autoContainCheckAllChange(val, index, matchKeywords)"
              >全选</el-checkbox>
              <div class="matchKeywordsGroup">
                <el-checkbox-group
                  v-model="checkedWords"
                  @change="val => autoContainCheckedWordsChange(val, index, matchKeywords)"
                >
                  <el-checkbox
                    v-for="(item, index) in matchKeywords"
                    :label="item"
                    :key="index"
                    :title="item"
                  ><template>
                    <span>{{ item }}</span><br><span>{{ matchKeywordsObj[item].join(',') }}</span>
                  </template></el-checkbox>
                </el-checkbox-group>
              </div>
              <div style="text-align: right; marginTop: 20px;">
                <el-button type="primary" size="mini" @click="autoContainPrimary(index)">确定</el-button>
              </div>
            </div>
          </template>
          <el-input
            v-if="input_number(item.type)"
            v-model.number.trim="item.text"
            :placeholder="item.placeholder"
          />
          <template v-if="input_number_between(item.type, index)">
            <el-input v-model.number.trim="item.text[0]" :placeholder="item.placeholder"/>-
            <el-input v-model.number.trim="item.text[1]" :placeholder="item.placeholder"/>
          </template>
          <el-select v-if="input_isbank(item.type)" v-model="item.text" placeholder="请选择">
            <el-option
              v-for="item in isBankData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-if="input_time(item.type)"
            v-model="item.text"
            type="date"
            placeholder="选择日期"
          />
          <el-date-picker
            v-if="input_time_between(item.type)"
            v-model="item.text"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </template>
        <i class="el-icon-delete" @click="deleteFilterRow(index)"/>
      </div>
      <el-button
        v-if="canAddRow"
        type="primary"
        plain
        icon="el-icon-circle-plus"
        @click="addFilterRow"
      >添加筛选</el-button>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left: 20px;"
        @click="searchList"
      >搜索</el-button>
    </div>
  </div>
</template>
<style lang="less">
.filter-el-checkbox {
  width: 150px;
  margin-top: 10px;
}
.el-checkbox + .el-checkbox {
  margin: 0;
}
.autoContainPopover {
  position: absolute;
  width: 400px;
  left: 460px;
  top: 48px;
  padding: 20px 10px;
  z-index: 220;
  background: #fff;
  border: 1px solid rgb(220, 223, 230);
  -webkit-box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
    0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14),
    0 1px 8px 0 rgba(0, 0, 0, 0.12);
}
.matchKeywordsGroup {
  width: 100%;
  max-height: 400px;
  margin-top: 20px;
  overflow: auto;
  .el-checkbox {
    display: flex;
    width: 100%;
    height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>

<script>
import { getFilterOption } from '@/utils/filter'
import { getMatchKeywords } from '@/api/companies'
export default {
  // 接受父组件的值
  props: {
    filterdata: {
      type: Object,
      default: function() {
        return {
          options: [],
          page: 1,
          pageSize: 15,
          totalNum: 0
        }
      }
    },
    filter: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  data() {
    return {
      openFilter: true,
      canAddRow: true,
      visibleShow: false, // 全选弹层显示隐藏
      isIndeterminate: false, // 多选框的不确定状态
      checkAll: true, // 是否多选
      autoContainPopoverShow: false, // 智能拓展全选弹层显示隐藏
      autoContainIsIndeterminate: false, // 智能拓展多选框的不确定状态
      autoContainCheckAll: true, // 智能拓展是否多选
      isBankData: [
        {
          value: 'true',
          label: '是'
        },
        {
          value: 'false',
          label: '否'
        }
      ],
      filterFrom: [],
      matchKeywordsObj: {},
      matchKeywords: [],
      checkedWords: [],
      autoContainKeyWord: ''
    }
  },
  computed: {
    totalIndex: function() {
      const _page = this.filterdata
      return `${(_page.page - 1) * _page.pageSize + 1}-${_page.page *
        _page.pageSize}`
    }
  },
  watch: {
    filter: function(newVal, oldVal) {
      this.filterFrom = newVal
    },
    autoContainKeyWord: function(newVal, oldVal) {
      if (newVal !== '') {
        this.getMatchKeywords(newVal)
      }
    }
  },
  mounted() {
    const _params = this.$route.params
    if (_params) {
      switch (_params.type) {
        case 'cats': {
          this.filterFrom = [
            {
              placeholder: '',
              selectedOptions: ['company_info', 'category_list'],
              text: _params.value,
              type: 'contain_string'
            }
          ]
          break
        }
      }
    }
    this.searchList()
  },
  methods: {
    searchList() {
      const _filterData = {}
      const _valueFun = e => {
        const _type = e.type
        let _value = e.text
        if (
          _type === 'containAny_string' ||
          _type === 'contain_string' ||
          _type === 'noContain_string'
        ) {
          if (!isNaN(_value)) {
            _value = _value.toString()
          }
          _value = _value.replace('，', ',')
          _value = _value.split(',')
        }
        return {
          type: _type,
          value: _value
        }
      }
      for (let i = 0; i < this.filterFrom.length; i++) {
        const _option = this.filterFrom[i].selectedOptions
        // 验证数字区间输入
        if (this.filterFrom[i].type === 'between_number') {
          const _text = this.filterFrom[i].text
          if (
            isNaN(_text[0]) ||
            isNaN(_text[1]) ||
            _text[1] <= _text[0] ||
            _text[0] === '' ||
            _text[0] === undefined
          ) {
            this.$message.error(
              '金额区间填写错误，输入不正确或后一项小于前一项'
            )
            return false
          }
        }
        if (_option && this.filterFrom[i].text) {
          if (this.filterFrom[i].type === 'autoContain_string') {
            _filterData['auto_description'] = [_valueFun(this.filterFrom[i])]
          } else {
            if (_filterData[_option[_option.length - 1]]) {
              _filterData[_option[_option.length - 1]].push(
                _valueFun(this.filterFrom[i])
              )
            } else {
              _filterData[_option[_option.length - 1]] = [
                _valueFun(this.filterFrom[i])
              ]
            }
          }
        }
      }
      this.$emit('filterQuery', _filterData, this.filterFrom)
    },
    downLoad() {
      this.$emit('downExport')
    },
    changeOpenFilter() {
      this.openFilter = !this.openFilter
    },
    input_string(type) {
      const types = [
        'mhContain_string',
        'containAny_string',
        'contain_string',
        'noContain_string',
        'equals_type',
        'before_type',
        'after_type'
      ]
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_autoContain(type) {
      const types = ['autoContain_string']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_number(type) {
      const types = ['after_number', 'before_number', 'equals_number']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_isbank(type) {
      const types = ['isBank_time', 'isBank_number', 'isBank_string']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_time(type) {
      const types = ['after_time', 'before_time', 'equals_time']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_number_between(type, index) {
      const types = ['between_number']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    input_time_between(type) {
      const types = ['between_time']
      if (types.indexOf(type) !== -1) {
        return true
      } else {
        return false
      }
    },
    typeOptions(option) {
      const typeOption = getFilterOption(this.filterdata.options, option)
      // this.filterFrom[index] = typeOption[0].value
      return typeOption
    },
    // 时间节点年份生成
    yearsBuild() {
      const _now = new Date().getFullYear()
      const _array = []
      for (let i = _now; i > 1900; i--) {
        _array.push({
          value: i,
          label: i
        })
      }
      return _array
    },
    // 添加筛选项
    addFilterRow() {
      this.filterFrom.push({
        text: '',
        selectedOptions: [],
        placeholder: ''
      })
      if (this.filterFrom.length > 4) {
        this.canAddRow = false
      } else {
        this.canAddRow = true
      }
    },
    // 删除筛选项
    deleteFilterRow(index) {
      this.filterFrom.splice(index, 1)
      if (this.filterFrom.length > 4) {
        this.canAddRow = false
      } else {
        this.canAddRow = true
      }
    },
    // 筛选改变
    handleChange(value, index) {
      if (value[value.length - 1] === 'investment_type') {
        this.$set(this.filterFrom, index, {
          placeholder: '',
          selectedOptions: value,
          type: 'contain_type',
          text: this.typeOptions(value)
        })
      } else if (value[value.length - 1] === 'timeNode') {
        // 时间节点特殊处理
        this.$set(this.filterFrom, index, {
          placeholder: '',
          selectedOptions: value,
          type: 'contain_string',
          text: ''
        })
      } else {
        this.$set(this.filterFrom, index, {
          placeholder: '',
          selectedOptions: value,
          text: ''
        })
      }
    },
    // 筛选类型改变
    typeChange(value, index, selectedOptions) {
      if (value === 'between_number') {
        this.$set(this.filterFrom, index, {
          placeholder: '',
          selectedOptions: selectedOptions,
          type: value,
          text: []
        })
      } else {
        this.$set(this.filterFrom, index, {
          placeholder: '',
          selectedOptions: selectedOptions,
          type: value,
          text: ''
        })
      }
    },
    // 全选
    handleCheckAllChange(val, index, valOptions) {
      this.filterFrom[index].text = val ? valOptions : []
      this.isIndeterminate = false
    },
    handleCheckedChange(val, index, valOptions) {
      const checkedCount = val.length
      const _textLength = valOptions.length
      this.checkAll = checkedCount === _textLength
      this.isIndeterminate = checkedCount > 0 && checkedCount < _textLength
    },
    autoContainInputFocus() {
      if (this.matchKeywords.length > 0) {
        this.autoContainPopoverShow = true
      }
    },
    // 请求智能拓展
    async getMatchKeywords(val) {
      await getMatchKeywords({ name: val })
        .then(res => {
          this.matchKeywordsObj = res.data[0]
          const _arr = []
          for (const key in res.data[0]) {
            _arr.push(key)
          }
          this.matchKeywords = this.checkedWords = _arr
          if (_arr.length > 0) {
            this.autoContainPopoverShow = true
          } else {
            this.autoContainPopoverShow = false
          }
        })
        .catch(res => {})
    },
    autoContainCheckAllChange(val, index, valOptions) {
      this.checkedWords = val ? valOptions : []
      this.autoContainIsIndeterminate = false
    },
    autoContainCheckedWordsChange(val, index, valOptions) {
      const checkedCount = val.length
      const _textLength = valOptions.length
      this.autoContainCheckAll = checkedCount === _textLength
      this.autoContainIsIndeterminate =
        checkedCount > 0 && checkedCount < _textLength
    },
    // 智能拓展确定
    autoContainPrimary(index) {
      this.autoContainPopoverShow = false
      let _checkedWords = []
      _checkedWords = _checkedWords.concat(this.checkedWords)
      for (let i = 0; i < this.checkedWords.length; i++) {
        _checkedWords = _checkedWords.concat(this.matchKeywordsObj[this.checkedWords[i]])
      }
      this.filterFrom[index].text = _checkedWords
    }
  }
}
</script>
