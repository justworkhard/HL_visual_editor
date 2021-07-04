import { Reducer, Effect } from 'umi';

export interface StateType {
  ifDrap: boolean,
  domList: any,
  selectDom: any
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    domList: Effect
    selectDom: Effect
  };
  reducers: {
    changeIfDrap: Reducer<StateType>;
    changeDomList: Reducer<StateType>
    changeSelectDom: Reducer<StateType>
  };
}

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    ifDrap: false,
    domList: [],
    selectDom: []
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeIfDrap',
        payload: payload,
      });
    },
    *domList({ payload }, { call, put }) {
      yield put({
        type: 'changeDomList',
        payload: payload,
      });
    },
    *selectDom({ payload }, { call, put }) {
      yield put({
        type: 'changeSelectDom',
        payload: payload,
      });
    },
  },

  reducers: {
    changeIfDrap(state, { payload }) {
      return {
        ...state,
        ifDrap: payload.ifDrap
      };
    },
    changeDomList(state, { payload }) {
      return {
        ...state,
        domList: payload.domList
      };
    },
    changeSelectDom(state, { payload }) {
      return {
        ...state,
        selectDom: payload.selectDom
      };
    },
  },
};

export default Model;
