import { Action, Data, State } from "@/common/types/Product";

// interface PAYLOAD {
//   value: string;
//   label: string;
//   _id?: string;
// }

const renderSelects = (
  dataArrays: Data[],
  currentIndex = 0,
  combination: Data[] = []
) => {
  const resultArrays: Data[][] = []; // Biến lưu trữ các mảng kết quả

  const loopArrays = (currentIndex: number, combination: Data[]) => {
    if (currentIndex === dataArrays.length) {
      resultArrays.push(combination); // Thêm mảng vào biến lưu trữ
      return;
    }

    const currentArray = dataArrays[currentIndex];
    currentArray.forEach((item) => {
      loopArrays(currentIndex + 1, [...combination, item]); // Đệ quy lặp qua các mảng
    });
  };

  loopArrays(currentIndex, combination); // Bắt đầu vòng lặp

  return resultArrays; // Trả về biến lưu trữ các mảng
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ATTRIBUTE":
      if (state.attributesChoose.includes(action.payload)) return state;

      return {
        ...state,
        attributesChoose: [...state.attributesChoose, action.payload],
      };

    case "ADD_VALUE":
      return {
        ...state,
        valuesChoose: [...state.valuesChoose, action.payload],
      };

    case "CLEAR_VALUES":
      return {
        ...state,
        valuesChoose: [],
      };

    case "DELETE_ONE_VALUE":
      return {
        ...state,
        attributesChoose: state.attributesChoose.filter(
          (value) => value._id !== action.payload
        ),
      };

    case "MIX_VALUES": {
      if (!state.valuesChoose.length) return state; // Check mảng rỗng
      const mix = renderSelects(state.valuesChoose[0]);

      return {
        ...state,
        valuesMix: mix,
      };
    }

    case "DELETE_INDEX_MIX_VALUE":
      return {
        ...state,
        valuesMix: state.valuesMix.filter(
          (_, index) => index !== action.payload
        ),
      };

    case "CLEAR":
      return {
        ...state,
        attributesChoose: [],
      };

    default:
      return state;
  }
};
