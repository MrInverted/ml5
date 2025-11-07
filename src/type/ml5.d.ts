interface Window {
  ml5: IML5;
}

type TML5Models = 'mobilenet' | 'darknet' | 'darknet-tiny' | 'doodlenet';

interface IML5 {
  featureExtractor: (
    model: TML5Models,
    callback: (error: unknown, model: IFeatureExtractorInstance) => void
  ) => IML5Instance;
}

interface IML5Instance {
  classification: () => IML5Classifier;
}


interface IML5Classifier {
  /**
   * Добавляет пример для обучения.
   * @param image HTMLImageElement | HTMLVideoElement | p5.Image
   * @param label Метка класса
   */
  addImage(image: HTMLImageElement, label: string): Promise<unknown>;

  /**
   * Обучает модель на добавленных изображениях.
   * @param callback Функция, вызываемая после каждой итерации обучения.
   *                 При завершении обучения параметр loss будет равен null.
   */
  train(callback: (loss: number | null) => void): void;

  /**
   * Классифицирует изображение или кадр видео после обучения.
   * @param image HTMLImageElement | HTMLVideoElement | p5.Image
   * @param callback Функция, получающая результат классификации.
   */
  classify(
    image: HTMLImageElement,
    callback: (error: Error | null, results: IML5ClassificationResult[]) => void
  ): void;

  /**
   * Сохраняет обученную модель в файлы (.json + .bin).
   * @param modelName Необязательное имя файла.
   */
  save(modelName?: string): void;

  /**
   * Загружает ранее сохранённую модель.
   * @param modelPath Путь или URL к model.json
   * @param callback Необязательная функция, вызываемая после загрузки модели.
   */
  load(modelPath: string, callback?: () => void): void;

  /**
   * Возвращает количество классов, зарегистрированных в модели.
   */
  numClasses(): number;

  /**
   * Очищает все добавленные примеры из набора данных.
   */
  clear(): void;

  /**
   * Возвращает внутренний классификатор TensorFlow.js
   * (например, tf.LayersModel или аналогичный объект).
   */
  getClassifier(): unknown;

  mapStringToIndex: string[]
  hasAnyTrainedClass: boolean
}


interface IML5ClassificationResult {
  label: string;       // Название класса
  confidence: number;  // Вероятность (0–1)
}


interface IIncData {
  label: string
  image: HTMLImageElement
}