void customFilter2D(const Mat& src, Mat& dst, const Mat& kernel) {
    dst.create(src.size(), src.type());

    int kernelRows = kernel.rows;
    int kernelCols = kernel.cols;
    int kernelCenterX = kernelCols / 2;
    int kernelCenterY = kernelRows / 2;

    for (int y = 0; y < src.rows; ++y) {
        for (int x = 0; x < src.cols; ++x) {
            double sum = 0.0;

            for (int kY = 0; kY < kernelRows; ++kY) {
                for (int kX = 0; kX < kernelCols; ++kX) {
                    int imgX = x + (kX - kernelCenterX);
                    int imgY = y + (kY - kernelCenterY);

                    if (imgX >= 0 && imgX < src.cols && imgY >= 0 && imgY < src.rows) {
                        sum += src.at<uchar>(imgY, imgX) * kernel.at<double>(kY, kX);
                    }
                }
            }

            dst.at<uchar>(y, x) = saturate_cast<uchar>(sum);
        }
    }
}

#include <stdio.h>
#include <stdlib.h>
#include <opencv2/opencv.hpp>

using namespace cv;
using namespace std;

// Function to perform Gaussian blur without using built-in functions
void myGaussianBlur(Mat& src, Mat& dst, int size, double sigma) {
    dst.create(src.size(), src.type());

    int radius = size / 2;
    int ksize = size * size;
    double* kernel = new double[ksize];
    double sum = 0.0;

    for (int i = -radius, k = 0; i <= radius; ++i) {
        for (int j = -radius; j <= radius; ++j, ++k) {
            kernel[k] = exp(-(i * i + j * j) / (2 * sigma * sigma));
            sum += kernel[k];
        }
    }

    // Normalize kernel
    for (int i = 0; i < ksize; ++i) {
        kernel[i] /= sum;
    }

    int rows = src.rows;
    int cols = src.cols;
    int channels = src.channels();

    for (int y = 0; y < rows; ++y) {
        for (int x = 0; x < cols; ++x) {
            double sum = 0.0;

            for (int k = 0; k < ksize; ++k) {
                int i = y + k / size - radius;
                int j = x + k % size - radius;

                if (i >= 0 && i < rows && j >= 0 && j < cols) {
                    sum += src.at<uchar>(i, j) * kernel[k];
                }
            }

            dst.at<uchar>(y, x) = saturate_cast<uchar>(sum);
        }
    }

    delete[] kernel;
}

// Function to compute image gradient using Sobel operators
void mySobelGradient(Mat& src, Mat& gradientX, Mat& gradientY) {
    Mat sobelX = (Mat_<char>(3, 3) << -1, 0, 1, -2, 0, 2, -1, 0, 1);
    Mat sobelY = (Mat_<char>(3, 3) << -1, -2, -1, 0, 0, 0, 1, 2, 1);

    filter2D(src, gradientX, -1, sobelX);
    filter2D(src, gradientY, -1, sobelY);
}

// Function to perform non-maxima suppression
void nonMaximaSuppression(Mat& gradientX, Mat& gradientY, Mat& dst) {
    dst.create(gradientX.size(), gradientX.type());

    int rows = gradientX.rows;
    int cols = gradientX.cols;

    for (int y = 0; y < rows; ++y) {
        for (int x = 0; x < cols; ++x) {
            float gx = gradientX.at<float>(y, x);
            float gy = gradientY.at<float>(y, x);

            float gradientMag = sqrt(gx * gx + gy * gy);
            dst.at<float>(y, x) = gradientMag;
        }
    }
}

int main(int argc, char** argv) {
    if (argc != 2) {
        printf("Usage: ./edge_detection <image_path>\n");
        return -1;
    }

    Mat src = imread(argv[1], IMREAD_GRAYSCALE);
    if (src.empty()) {
        printf("Could not open or find the image\n");
        return -1;
    }

    // Gaussian blur
    Mat blurred;
    myGaussianBlur(src, blurred, 5, 1.4);

    // Sobel edge detection
    Mat gradientX, gradientY;
    mySobelGradient(blurred, gradientX, gradientY);

    // Compute gradient magnitude
    Mat gradientMagnitude;
    nonMaximaSuppression(gradientX, gradientY, gradientMagnitude);

    // Display results
    imshow("Original Image", src);
    imshow("Blurred Image", blurred);
    imshow("Gradient Magnitude", gradientMagnitude);
    waitKey(0);

    return 0;
}
